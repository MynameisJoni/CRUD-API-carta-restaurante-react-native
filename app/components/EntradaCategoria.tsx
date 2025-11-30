import { View, Button,Text, StyleSheet, TextInput } from "react-native";
import { useEffect, useState, useRef  } from "react";
import { getCategorias, postCategorias, putCategoria, deleteCategoria } from '../api/api';
import BloqueNuevaCategoria from "./BloqueNuevaCategoria";
import * as ImagePicker from 'expo-image-picker';
import BotonImagenCategoria from "./BotonImagenCategoria";
import ImageViewer from "./ImageViewer";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

interface Categoria{
    id: number;
    nombre: string;
    tipo: 'nueva';
}

const PlaceholderImage = require('@/assets/images/icon.png')

export default function EntradaCategoria(){

    const [ categorias, setCategorias ] = useState<Categoria[]>([]);
    const [ nuevaCategoria, setNuevaCategoria ] = useState("");
    const [ editandoId, setEditandoId ] = useState<number | null>(null);
    const [ nombreEditado, setNombreEditado ] = useState("");
    const [ imagenesCategoria, setImagenesCategoria ] = useState<{[key: number]: string}>({});
    const [ facing, setFacing ] = useState<CameraType>('back');
    const [ permission, requestPermission ] = useCameraPermissions();
    const [ showCamera, setShowCamera ] = useState(false);
    const [ categoriaActual, setCategoriaActual ] = useState<number | null>(null);
    const cameraRef = useRef<CameraView>(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar las categorias:", error);
            }
        };
        fetchCategorias();
    }, []);

    const agregarCategoria =  async () => {
        try{
            const response = await postCategorias(nuevaCategoria);

            const nueva = {
                id: response.id,
                nombre: nuevaCategoria,
                tipo: 'nueva' as const
            };

            setCategorias([...categorias, nueva]);
            setNuevaCategoria("");
        } catch (error){
            console.error("Error al crear categoria:", error);
        }
    };

    const iniciarEdicion = (id: number, nombre: string) =>{
        setEditandoId(id);
        setNombreEditado(nombre);
    }
    const editarCategoria = async(id: number, nuevoNombre: string) => {
        try{
            await putCategoria(id, nuevoNombre);
            setCategorias(categorias.map(categoria => 
                categoria.id === id ? {...categoria, nombre: nuevoNombre} : categoria
            ));
            setEditandoId(null);
            setNombreEditado("");
        } catch (error) {
            console.error("Error al editar categoría:", error);
        }
    };

    const eliminarCategoria = async (id: number) => {
        try{
            await deleteCategoria(id);
            setCategorias(categorias.filter(categoria => categoria.id !== id));
        } catch (error){
            console.error("Error al eliminar categoría:", error);
        }
    }; 

    const pickImageAsync = async(categoriaId: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled){
            setImagenesCategoria({...imagenesCategoria, [categoriaId]: result.assets[0].uri});
        }else{
            alert("No se ha seleccionado ninguna imagen");
        }
    };

    const takePictureAsync = async(categoriaId: number) => {
        if (!permission) {
            return;
        }

        if (!permission.granted) {
            const result = await requestPermission();
            if (!result.granted) {
                alert("Necesitamos permisos de cámara");
                return;
            }
        }

        setCategoriaActual(categoriaId);
        setShowCamera(true);
    };

    const capturePhoto = async() => {
        if (cameraRef.current && categoriaActual !== null) {
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 1,
                    base64: false,
                    skipProcessing: false,
                });
                if (photo && photo.uri) {
                    setImagenesCategoria({...imagenesCategoria, [categoriaActual]: photo.uri});
                    setShowCamera(false);
                    setCategoriaActual(null);
                } else {
                    alert("Error al capturar la foto");
                }
            } catch (error) {
                console.error("Error al tomar foto:", error);
                alert("Error al tomar la foto");
            }
        }
    };

    if (showCamera) {
        return (
            <View>
                <View>
                    <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
                </View>
                <View style={styles.cameraControls}>
                    <Button title="Cancelar" onPress={() => setShowCamera(false)} />
                    <Button title="Tomar foto" onPress={capturePhoto} />
                </View>
            </View>
        );
    }

    return(
        <View>
            <View style={styles.añadirCategoria}>
                <TextInput
                    value={nuevaCategoria}
                    onChangeText={setNuevaCategoria}
                    placeholder="Añadir nueva categoría..."
                    placeholderTextColor='#000'/>
                <Button
                    title="Añadir"
                    onPress={agregarCategoria} />
            </View>

            {categorias.map((categoria) => (
                <View key={categoria.id} style={styles.bloqueCategoria}>
                    {editandoId === categoria.id ? (
                        <View style={styles.editarCategoria}>
                            <TextInput 
                                value={nombreEditado}
                                onChangeText={setNombreEditado}/>
                            <Button 
                                title="Guardar"
                                onPress={() => editarCategoria(categoria.id, nombreEditado)}/>
                        </View>
                    ) : (
                        <View style={styles.contenedorCategoria}>
                            <ImageViewer
                                imgSource={PlaceholderImage}
                                selectedImage={imagenesCategoria[categoria.id]} />
                            <View style={styles.botonesImagen}>
                                <BotonImagenCategoria
                                    label="Galería"
                                    onPress={() => pickImageAsync(categoria.id)} />
                                <BotonImagenCategoria
                                    label="Cámara"
                                    onPress={() => takePictureAsync(categoria.id)} />
                            </View>
                            <Text style={styles.tituloCategoria}>{categoria.nombre}</Text>
                        </View>
                    )}

                    {(<BloqueNuevaCategoria categoriaId={categoria.id}/>)}

                    <View style={styles.botonesCategoria}>
                        <Button
                            title="Editar Categoría" 
                            onPress={() => iniciarEdicion(categoria.id, categoria.nombre)}/>
                        <Button 
                            title="Eliminar Categoría"
                            onPress={() => eliminarCategoria(categoria.id)}/>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    añadirCategoria:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        margin: 15,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(224, 190, 149, 1)',
    },
    bloqueCategoria:{
        color: 'black',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        borderRadius:5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    editarCategoria:{
        top:0,
        margin: 15,
        padding: 10,
        borderRadius: 5,
        zIndex: 1,
        backgroundColor: 'rgba(224, 190, 149, 1)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    botonesCategoria: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10,
    },
    tituloCategoria:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    contenedorCategoria: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonesImagen: {
        flexDirection: 'row',
        marginLeft:55,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    camera: {
        width: '100%',
        height: '80%',
    },
    cameraControls: {
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        paddingHorizontal: 40,
        paddingVertical: 15,
        justifyContent: 'space-around',
    }
})