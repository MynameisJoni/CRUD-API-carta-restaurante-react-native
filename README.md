# UT2 - Creación de una carta de un restaurante con React
## Índice
- [Principales Cambios](#principales-cambios)
- [Estilos](#estilos)
- [Componentes](#componentes)
  - [EntradaCategoria.tsx](#entradacategoriatsx)
  - [BloqueNuevaCategoria.tsx](#bloquenuevacategoriatsx)
- [CRUD Productos](#crud-via-api)
  - [GET Categorías / Productos](#get-categorías--productos)
  - [POST Categorías / Productos](#post-categorías--productos)
  - [PUT Categorías / Productos](#put-categorías--productos)
  - [DELETE Categorías / Productos](#delete-categoría--productos)
  - [Aplicación de los Componentes](#aplicación-en-los-componentes)
- [Resultado final de index.tsx](#resultado-final-de-indextsx)
- [Repositorio](#repositorio)

## Principales Cambios
En este proyecto trataremos la migración de la carta desde React a React-Native. Ambas comparten ciertas similitudes pero en este proyecto se tratarán sus diferencias.

### Estilos
Uno de los principales cambios, y de los que menos se tocarán en este documente son los estilos. A diferencia de como se hizo en React, en React-Native los estilos irán directamente en cada componente. Para ello habrá que importar 'StyleSheet' y crear la variable con los estilos:
```javascript
import { Image, View, StyleSheet, ScrollView } from "react-native";
// código...
<ComponenteRandom style={styles.etiqeuetaEstilo} />

const styles = StyleSheet.create({
  etiquetaEstilo: {

  }
})
```
Como se aprecia, en lugar de className para llamar al css, se utiliza style={nombreDeLaVariableDeEstilo.etiquetaEstilo}.

Otra particularidad es que muchos atributos se escriben de manera diferente al CSS convencional, como por ejemplo *background-color*. En React-Native sería *backgroundColor* y el valor en lugar de escribirlo 'a pelo', debe ir entre comillas:
```css
background-color: black;
/* vs */
backgroundColor: 'black';
```

## Componentes
En este proyecto se usarán los mismos componentes respecto a la versión de React:
- api.tsx (no es un componente como tal, pero trabajaremos con la api desde aquí. Es más, el fichero es exactamente el mismo que en React, así que se mantiene la misma explicación)
- index.tsx: Similar a App.tsx y explicado en el último apartado
- EntradaCategoría.tsx
- BloqueNuevaCategoria.tsx

> [!NOTE]
> Tanto en *EntradaCategoria* como *BloqueNuevaCategoria* se utilizarán las mismas funciones para el CRUD que en la versión de React, por lo que no se tocarán en esta entrega. Esta explicación se va a centrar más en el cambio de componentes y atributos.

### EntradaCategoria.tsx
Otra de las novedades respecto a React es que ahora nos 'depedimos' de las etiquetas clásicas de HTML para emplear las propias de React Native. Su uso es algo similar pero variando sus nombres y el manejo de sus atributos.

Por ejemplo: ahora en lugar de encapsular todo en un *div* se va a emplear un *View*. Con la particularidad de que para su correcto uso se tendrá que importar la etiqueta:
```javascript
import { View, Button,Text, StyleSheet, TextInput } from "react-native";
// Se importará cada etiqueta que se quiera emplear en la vista
```
En primer lugar se va a establecer el input con el que iremos añadiendo las categorías a la API:
```javascript
<View style={styles.añadirCategoria}> // Encerramos todo en un View
    <TextInput 
        value={nuevaCategoria} // nombre de la categoría
        onChangeText={setNuevaCategoria} // 'guardar' y establecer el nombre
        placeholder="Añadir nueva categoría..."
        placeholderTextColor='#000'/>
    <Button
        title="Añadir"
        onPress={agregarCategoria} /> // llamada a la función para agregar la categoría
</View>
```
De este modo guardamos cada nueva categoría en la API. A continuación, con el uso de un *map* vamos a recorrer todas las categorías de la api y en el mismo bloque se añadirán las funciones para editar o eliminar la categoría, así como la llamada al componente *BloqueNuevaCategoria* que contiene todos los productos de esa categoría.
En un primer bloque se establece (empleando los *if* del futuro '?' y ':') que, si se pulsa la edición, el nombre de la categoría pasa a modo edición y si no que se muestre el nombre:
```javascript
{editandoId === categoria.id ? ( // 'Si' se está editando la categoría ... 
    <View style={styles.editarCategoria}>
        <TextInput  // ... se muestra el input para modificar el nombre ...
            value={nombreEditado}
            onChangeText={setNombreEditado}/>
        <Button 
            title="Guardar"
            onPress={() => editarCategoria(categoria.id, nombreEditado)}/>
    </View>
) : ( // ...si 'no'...
    <Text style={styles.tituloCategoria}>{categoria.nombre}</Text> // ... Se muestra el nombre actual (o el establecido después de editar)
)}
```
Seguido a esto vendrían los productos pertenecientes a esa categoría:
```javascript
{(<BloqueNuevaCategoria categoriaId={categoria.id}/>)}
```
Y por último, los botones de edición / eliminar:
```javascript
<View style={styles.botonesCategoria}>
    <Button
        title="Editar Categoría" 
        onPress={() => iniciarEdicion(categoria.id, categoria.nombre)}/> // llamada a la función editar
    <Button 
        title="Eliminar Categoría"
        onPress={() => eliminarCategoria(categoria.id)}/> // llamada a la función eliminar
</View>
```

### BloqueNuevaCategoria.tsx
La mecánica de este componente es similar a la anterior. Se importan las etiquetas, definen las funciones y se retorna la vista de la misma forma que las categorías.
Con un map se recorren todos los productos de la categoría y, por cada producto, se muestra:
```javascript
 {editandoId === producto.id ? ( // si se está editando el producto...
    <View> 
        <TextInput
            value={nombreEditado}
            onChangeText={setNombreEditado} />
        <TextInput
            value={precioEditado}
            onChangeText={setPrecioEditado} />
        <Button
            title="Guardar"
            onPress={() => editarProducto(producto.id, nombreEditado, parseFloat(precioEditado))} /> // llamada a la función de guardar edición
    </View> // ... se llaman a los formularios de edición y al botón de guardar...
) : ( // ... si no, pues se muestran los productos y cada uno con su botón de editar / eliminar
    <View style={styles.listaProductos}>
        <View style={styles.lineaProducto}>
            <Text style={{fontSize: 16, fontWeight:'bold'}}>{producto.nombre}</Text>
            <Text style={{fontSize: 16}}>{producto.precio}€</Text>
        </View>
        <View style={styles.botonesProducto}>
            <Button
                title="Editar"
                onPress={() => iniciarEdicion(producto.id, producto.nombre, producto.precio)} /> // llamada a la función para editar
            <Button
                title="Eliminar"
                onPress={() => eliminarProducto(producto.id)} /> // llamada a la función para eliminar
        </View>
    </View>
)}
```
Y por último, se define el botón para añadir y los formularios (no muy elegantes...) para añadir el producto y el precio nuevos:
```javascript
<View style={styles.formAñadir}>
    <TextInput
        value={nuevoNombre} // nuevo nombre
        onChangeText={setNuevoNombre} // se establece el nombre nuevo
        placeholder="Nombre..." 
        placeholderTextColor='#000'/>
    <TextInput
        value={nuevoPrecio} // nuevo precio
        onChangeText={setNuevoPrecio} // se establece el nuevo precio
        placeholder="Precio..." 
        placeholderTextColor='#000' />
    <Button
        title="Añadir"
        onPress={anadirProducto} />
</View>
```

## CRUD via API
En este apartado se va a 'olvidar' parte de lo nombrado anteriormente, ya que se trabajará en la gestión de los elementos de la carta vía API. Para ello y en primer lugar se necesita crear un fichero (*api.tsx* en este caso) en el que gestionar los métodos ***fetch*** (métodos para hacer peticiones) a la API.

A continuación se describirán los cuatro métodos para un CRUD básico centrandose solo en categorías (se entiende que los métodos son similares a los productos, aunque en caso de haber diferencias se señalarán)

Al principio del fichero se definen las constantes URL(API)y USER(usuario de la API) para mayor simplicidad del código:
```javascript
const URL = 'https://jlorenzo.ddns.net/carta_restaurante';
const USER = '3005';
```
### GET Categorías / Productos
Este método permitirá obtener todas las categorías así como los productos pertenecientes a cada una de ellas. 
En primer lugar, después de declarar la función, se hace la llamada a la api:
```javascript
// Categorias
const response = await fetch(`${URL}/categorias/?usuario_id=${USER}`);

// Productos
const response = await fetch(`${URL}/productos/${categoriaId}?usuario_id=${USER}`);
```
En esta constante se declara la 'ruta' de la api de donde se leerán las categorías y cada producto perteneciente a esta (nótese que se llama a los productos seguidos del id de la categoría).

A continuación, para manejo de errores se utiliza lo siguiente:
```javascript
if(!response.ok){ // Primero se comprueba si la respuesta HTTP es exitosa
    throw new Error("Error obteniendo categorias"); // lanza el error si no lo es
} else { // si tiene éxito, devuelve un json...
    const data = await response.json();
    return (data.data || []).map((cat: any) => ({ // ... que devolveremos como un array
        id: Number(cat.id ?? cat.categoria_id),
        nombre: cat.nombre
    }));
}
```
Dicho de otra manera... simplemente *si hay fallo, lanza un error, si no, pues que devuelve un array con el contenido devuelto de la api*. **Esto se aplicará a todos los métodos así que solo se deja explicado en este apartado*

### POST Categorías / Productos
En este apartado se tratará el como añadir categorías o productos. De manera similar al resto de métodos, primero, luego de declarar la función, se hace la llamada a la api con la constante *response*...
```javascript
// categorias
const response = await fetch(`${URL}/categorias/`, {...
// productos
const response = await fetch(`${URL}/productos/${categoriaId}`, {...
```
... aunque con una particularidad respecto al método anterior. En el método anterior simplemente se le 'decía' a la API: 'Hey, devuelveme todo lo que encuentres'. Ahora hay que especificar qué queremos hacer con lo que se devuelve, por eso se debe especificar lo siguiente:
```javascript
// Categorias
{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      usuario_id: USER,
      nombre:nombre
  })
})
// productos
{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      usuario_id: USER,
      nombre: nombre,
      precio: precio,
      orden: 1 
  })
}
```
Se puede apreciar que llamamos al método POST. Este lo que hace es añadir categorías / productos en su determinado componente (ya se verá más adelante). Luego definimos la cabecera *(headers)*, básicamente estamos diciendo el tipo de contenido *(body)*, en este caso un *json*. Y por último el contenido de la petición.

### PUT Categorías / Productos
Lo que se tratará en este apartado es la edición / manipulación de los dos componentes. La dinámica es la misma que en el resto de apartados:
```javascript
// solo se mostrará categorías porque productos es igual
const response = await fetch(`${URL}/categorias/${id}`,{
```
Primero se le indica que id de categoría / producto se va a modificar. A continuación, e igual que antes:
```javascript
{
  method: 'PUT',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      usuario_id: USER,
      nombre: nombre
  })
}
```
1º Llamamos al método PUT (editar)
2º Header indicando que se va a tratar un *json*
3º Indicar el contenido del *body*

### DELETE Categoría / Productos
Por último, el paso final: eliminar categorías y productos. De manera similar al resto de métodos definimos el id o la categoría o el producto que se va a eliminar:
```javascript
// Categoría
const response = await fetch(`${URL}/categorias/${id}`,{
// Productos
const response = await fetch(`${URL}/productos/${id}?usuario_id=${USER}`,{
```
Acto seguido, se hace la llamada a DELETE: 
```javascript
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json'},
  body: JSON.stringify({usuario_id: USER})
});
```

### Aplicación en los Componentes
Los métodos empleados en los componentes BloqueTaza y BloquePostre son similares a cuando se trabajaba con el json inicial de productos y categorías. Una de las diferencias es que, ahora para listar todas las categorías y productos se empleará *useEffect*. En la primera parte de la actividad se listaba el json inicial, en la segunda se mostraba la carta vacía y se iba rellenando conforme preferencia del usuario y por último, en este paso, mostramos un json predefinido en la API. Para este primer paso emplearemos este bloque:

**Solo se muestra el código de categorias ya que productos es similar*
```javascript
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
```
Simplemente llamamos a todas las categorías / productos con el método getCategorias (no nos olvidemos de **importarlo** al inicio del fichero!!) y lo tratamos con un manejo de errores que devuelve un mensaje en caso de no poder cargar las categorías. como resultado nos da el array con las categorías disponibles. Luego se muestra con un map, para recorrer el array, en la vista de la siguiente manera:
```javascript
{categorias.map((categoria) => ( // ... resto de código ...
//...                         
  <h3>{categoria.nombre}</h3> // solo mostramos el nombre de la categoría
    )}
    {(<BloqueNuevaCategoria categoriaId={categoria.id}/>)} // se muestra el bloque completo, es decir, con todo el contenido dentro de la cagoria -> Productos
```

## Resultado final de index.tsx
Una vez definidos los **componentes**, el resultado del fichero principal se debería ver de la siguiente manera:
```javascript
import { Image, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BloqueNuevaCategoria from "./components/BloqueNuevaCategoria";
import EntradaCategoria from "./components/EntradaCategoria";

export default function Index() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Image 
        style={styles.fondo}
        source={require('../assets/images/beans.jpg')} />
      <View style={styles.contenido}>
        <ScrollView style={styles.carta}>
          <Header />
          <EntradaCategoria />
          <View style={styles.footer}>
            <Footer />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    position: 'absolute',
    top:'10%',
    width: '80%',
    height: '90%',
    marginLeft: '10%',
    backgroundColor: 'rgb(217, 175, 124)',
    flexDirection: 'column',
  },
  carta: {
    flex:1
  },
  footer:{
    marginTop: 60,
    paddingBlock:20
  },
  fondo: {
    position: 'absolute',
    width: '100%',
  }
});
```

## Repositorio
https://github.com/MynameisJoni/CRUD-API-carta-restaurante-react-native