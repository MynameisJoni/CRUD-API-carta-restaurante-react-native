import { View, Button,Text, StyleSheet, TextInput } from "react-native";
import { useEffect, useState  } from "react";
import { getCategorias, postCategorias, putCategoria, deleteCategoria } from '../api/api';
import BloqueNuevaCategoria from "./BloqueNuevaCategoria";

interface Categoria{
    id: number;
    nombre: string;
    tipo: 'nueva';
}

export default function EntradaCategoria(){

    const [ categorias, setCategorias ] = useState<Categoria[]>([]);
    const [ nuevaCategoria, setNuevaCategoria ] = useState("");
    const [ editandoId, setEditandoId ] = useState<number | null>(null);
    const [ nombreEditado, setNombreEditado ] = useState("");

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
                        <Text style={styles.tituloCategoria}>{categoria.nombre}</Text>
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
    }
})