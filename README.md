# UT2 - Creación de una carta de un restaurante con React
## Índice
- [App](#app)
- [CRUD Productos](#crud-via-api)
  - [GET Categorías / Productos](#get-categorías--productos)
  - [POST Categorías / Productos](#post-categorías--productos)
  - [PUT Categorías / Productos](#put-categorías--productos)
  - [DELETE Categorías / Productos](#delete-categoría--productos)
  - [Aplicación de los Componentes](#aplicación-en-los-componentes)
- [Resultado final de index.tsx](#resultado-final-de-indextsx)
- [Repositorio](#repositorio)

## App



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