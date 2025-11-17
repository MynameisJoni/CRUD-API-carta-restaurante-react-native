import { View, Button,Text, StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { getProductos, postProductos, putProductos, deleteProductos } from '../api/api';

interface Producto {
    id: number;
    nombre: string;
    precio: number;
}


export default function BloqueNuevaCategoria({categoriaId}: {categoriaId: number}){

    const [productos, setProductos] = useState<Producto[]>([]);
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoPrecio, setNuevoPrecio] = useState("");
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nombreEditado, setNombreEditado] = useState(""); 
    const [precioEditado, setPrecioEditado] = useState("");

    useEffect(() => {
        const fetchProductos = async () => {
            try{
                const data = await getProductos(categoriaId);
                setProductos(data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        fetchProductos();
    }, [categoriaId]);

    const anadirProducto = async () => {
        if(productos.length < 6){
            try{
                await postProductos(categoriaId, nuevoNombre, parseFloat(nuevoPrecio));
                const actualizados = await getProductos(categoriaId);
                setProductos(actualizados);
                setNuevoNombre("");
                setNuevoPrecio("");
            } catch (error) {
                console.error("Error al crear productos:", error);
            }
        } else {
            alert("máximo de 6 productos alcanzado");
        }
    };

    const iniciarEdicion = (id: number, nombre: string, precio: number) =>{
        setEditandoId(id);
        setNombreEditado(nombre);
        setPrecioEditado(precio.toString());
    }
    const editarProducto = async(id: number, nuevoNombre: string, nuevoPrecio: number) => {
        try{
            await putProductos(id, nuevoNombre, nuevoPrecio);
            setProductos(productos.map(producto => 
                producto.id === id ? {...producto, nombre: nuevoNombre, precio: nuevoPrecio} : producto
            ));
            setEditandoId(null);
            setNombreEditado("");
            setPrecioEditado("");
        } catch (error) {
            console.error("Error al editar Producto:", error);
        }
    };

    const eliminarProducto = async (id: number) => {
        try{
            await deleteProductos(id);
            setProductos(productos.filter(producto => producto.id !== id));
        } catch (error){
            console.error("Error al eliminar categoría:", error);
        }
    };

    return(
        <View>
            <View style={styles.listaProductos}>
                {productos.map((producto) => (
                    <View key={producto.id} style={styles.lista}>
                        {editandoId === producto.id ? (
                            <View>
                                <TextInput
                                    value={nombreEditado}
                                    onChangeText={setNombreEditado} />
                                <TextInput
                                    value={precioEditado}
                                    onChangeText={setPrecioEditado} />
                                <Button
                                    title="Guardar"
                                    onPress={() => editarProducto(producto.id, nombreEditado, parseFloat(precioEditado))} />
                            </View>
                        ) : (
                            <View style={styles.listaProductos}>
                                <View style={styles.lineaProducto}>
                                    <Text style={{fontSize: 16, fontWeight:'bold'}}>{producto.nombre}</Text>
                                    <Text style={{fontSize: 16}}>{producto.precio}€</Text>
                                </View>
                                <View style={styles.botonesProducto}>
                                    <Button
                                        title="Editar"
                                        onPress={() => iniciarEdicion(producto.id, producto.nombre, producto.precio)} />
                                    <Button
                                        title="Eliminar"
                                        onPress={() => eliminarProducto(producto.id)} />
                                </View>
                            </View>
                        )}
                    </View>
                ))}

                <View style={styles.formAñadir}>
                    <TextInput
                        value={nuevoNombre}
                        onChangeText={setNuevoNombre}
                        placeholder="Nombre..." 
                        placeholderTextColor='#000'/>
                    <TextInput
                        value={nuevoPrecio}
                        onChangeText={setNuevoPrecio}
                        placeholder="Precio..." 
                        placeholderTextColor='#000' />
                    <Button
                        title="Añadir"
                        onPress={anadirProducto} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listaProductos:{
        width: '100%',
        marginBottom: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    lista:{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    formAñadir:{
        display: 'flex',
        gap: 8,
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(224, 190, 149, 1)',
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    botonesProducto:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        marginTop: 10,
        backgroundColor: 'rgba(199, 146, 82, 1)',
    },
    lineaProducto:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})