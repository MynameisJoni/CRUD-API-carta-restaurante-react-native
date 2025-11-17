# UT2 - Creación de una carta de un restaurante con React
## Índice
- [App](#app)
  - [Imágenes](#imagenes)
- [Componentes](#componentes)
  - [Header](#header)
  - [BloqueTaza y BloquePostre](#bloquetaza-y-bloquepostre)
  - [Footer](#footer)
- [CRUD Categorías](#crud-categorías)
  - [EntradaCategoria](#entradacategoria)
    - [Agregar Categoría](#agregar-categoría)
    - [Editar Categoría](#editar-categoría)
    - [Eliminar Categoría](#eliminar-categoría)
    - [return](#return-entradacategorias)
- [CRUD Productos](#crud-productos)
  - [GET Categorías / Productos](#get-categorías--productos)
  - [POST Categorías / Productos](#post-categorías--productos)
  - [PUT Categorías / Productos](#put-categorías--productos)
  - [DELETE Categorías / Productos](#delete-categoría--productos)
  - [Aplicación de los Componentes](#aplicación-en-los-componentes)
- [Resultado final de App.tsx](#resultado-final-de-apptsx)
- [Repositorio](#repositorio)

En este proyecto se ha dividido la estructura de la cacrta en 5 ficheros principales:
<ul>
  <li>App</li>
  <li>Header</li>
  <li>Footer</li>
  <li>BloqueTaza</li>
  <li>BloquePostre</li>
</ul>

Para el estilo de la carta se ha utilizado un solo fichero css.

A continuación definiremos cada uno de ellos.

## App
Componente principal. En el se definió la imagen de fondo de la carta y el contenedor principal. En este último emplearemos los componentes creados.
Su composición será la siguiente:
```javascript
export default function App() {
  return (
    <div className='contenedor'>
      <img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
      <div className="carta">
        <!-- Componentes -->
      </div>
    </div>
  )
}
```
Se encuentra el *contenedor* principal. Dentro se establece la imagen principal *(fondo)* y la clase *carta*. Como se dijo anteriormente, esta última va a ser la más importante, ya que dentro de ella irán el resto de componentes.

El estilo utilizado es el siguiente (en el mismo encontramos la explicación de las propiedades más relevantes):
```css
.contenedor{
  position: relative; /* Posicionar el contenedor para los elementos hijos */
  width: 30%;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  overflow: hidden; /* Elimina todo lo que sobresalga del contenedor */
}
.carta{
  position: absolute; /* Se posiciona respecto al contenedor */ 
  top: 5%; /* Separación superior */
  width: 80%;
  height: 90%;
  margin-left: 10%;
  background-color: rgb(217, 175, 124);
}
```
### Imágenes
Mención especial a la carpeta *images* situada en la raiz del proyecto. Aquí irán todas las imagenes utilizadas en el proyecto. Como por ejemplo la imagen de fondo:
```javascript
<img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
```

## Componentes
Dentro de **src** se crea la carpeta para almacenar los componentes que componen la app.

La estructura básica de cada componente será la siguiente:

```javascript
import "../App.css";

export default function NombreDelComponente(){
    return (
      /* Composición del componente */
    );
}
```
En las explicaciones de los componentes solo se mostrará lo que en el bloque anterior se definió como *Composición del componente*.

El *NombreDelComponente* será el título de cada apartado.

### Header
Cabecera de la carta. Componente sencillo en donde se definen el título de la carta y una breve descripción:
```javascript
import "../App.css";
/* ... */
<div className="bloqueHeader">
    <h1>CAMPER CAFE</h1>
    <p>Est. 2020</p>
    <hr />
</div>
```
Primero que nada, se importa el estilo de *App.css*.

Encapsulamos todo el componente en una clase *bloqueHeader*. Dentro se encontrarán las etiquetas:
-  **h1**: título principal de la carta
- **p**: descripción
- **hr**: una linea para separar

Los estilos utilizados:
```css
.bloqueHeader{
  text-align: center;
  color: black;
}
.bloqueHeader h1{
  font-size: 50px;
  font-weight: bold;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  margin: 5; 
}
```
Como propiedades más relevantes se encuentran *text-align* para centrar todo el texto del Header y *margin* espécifico para **h1** para separar el título principal del margen superior del *contenedor*

### BloqueTaza y BloquePostre
Se encuentra el contenido principal de la carta. Se va explicar ambos componentes en el mismo apartado ya que comparten prácticamente la misma estructura. 

En un primer lugar, como siempre, se importa el estilo de *App.css*, pero lo más importante es importar el contenido de la carta del fichero *precios.json*:
```json
{
    "bebidas": [
        {
            "nombre": "French Vanilla",
            "precio": 1.50
        },
        /* resto de propiedades...*/
    ],
    /* ...incluido los postres */
 }
```
En este fichero se van a definir todos los componentes de la carta. En el caso del ejercicio solo encontramos *bebidas* y *postres*. Dentro de cada uno se especifican el *nombre* del producto y el *precio* del mismo.

En este componente se va a encapsular todo el contenido dentro de un **div** principal. En primer lugar se encuentra el título del bloque y la imágen de forma silimar a las vistas anteriormente:
```javascript
<div className="bebidas">
    <h3>Coffee</h3>
    <img src="./images/coffee.jpg" alt='taza'/>
</div>   
```
Antes se habló del array del *json*, esto es importante porque ahora se empleará un **map** para acceder a cada elemento del array, pero antes, definimos el array de la siguiente manera:
```javascript 
import datos from '../precios.json'; /* el array nombrado anteriormente */
/* ...resto de código...*/
    {datos.bebidas.map(bebidas => (
```
De aquí la parte importante es que se define el nombre del *json* como *datos* y luego accedemos **solo** a las *bebidas* (de ahí el *datos.bebidas*). Seguidamente se emplea un **map** para recorrer el array (un *map* es similar al conocido y temido *for*). En el ejercicio se emplea así:
```javascript
{datos.bebidas.map(listaBebidas => ()
```
Primero se tiene el array, se recorre con un *map* y seguidamente se define un nombre de variable *listaBebidas* (*listaPostres* para el componente de los postres). Luego se define una **key** para que react pueda identificar cada elemento:
```javascript
<div key={listaBebidas.nombre} className="lista">
```
Y por último accedemos a cada elemento de *bebidas* dentro del *json*:
```javascript
<span>{listaBebidas.nombre}</span>
<span>{listaBebidas.precio}</span>
```
De esta forma accedemos al *nombre* y al *precio* de *bebidas* dentro del *json*. El bloque completo quedaría de la siguiente manera:
```javascript
<div>
    <div className="bebidas">
        <h3>Coffee</h3>
        <img src="./images/coffee.jpg" alt='taza'/>
    </div>    
    <div className="listaBebidas">
        {datos.bebidas.map(listaBebidas => (
            <div key={listaBebidas.nombre} className="lista">
                <span>{listaBebidas.nombre}</span>
                <span>{listaBebidas.precio}</span>
            </div>
        ))}
    </div>
</div>
```
En resumidas cuentas:
- Se importan estilos y json (array *datos*)
- Se define un *'header'* para este bloque
- Se llama al array y se recorre el mismo con un *map*

Como resultado se tiene una lista con los productos y precios definidos dentro del *json*

Los estilos utilizados son los siguientes:
```css
.bebidas{
  color: black;
  text-align: center;
  display: flex;
  flex-direction: column; /* Los elementos se colocan uno debajo del otro... */
  align-items: center; /* ... y centrados */
}
.bebidas h3{
  font-size: 40px;
  font-weight: bold;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  margin: 0; /* Elimina el margen predeterminado de la etiqueta h3 */
}
.listaBebidas{
  color: black;
  padding: 20px;
  font-size: 20px;
}
.lista{
  width: 100%;
  display: flex;
  justify-content: space-between; /* Separamos los elementos dentro del bloque */
}
```
*Este ejemplo es para las bebidas, pero se ha empleado el mismo código para los postres*

### Footer
Este componente es similar al header:
- Se define un separador
- En lugar de un título se establece un enlace (en este caso para algo útil como la documentación react)
- Por último, una breve descripción

```javascript
<div className="footer">
    <hr />
    <a href="https://react.dev">
    Mas cositas de React
    </a>
    <p>Primer proyecto React</p>
</div>
```
*Como siempre, nunca olvidar importar los estilos:*
```css
.footer{
  text-align: center;
  color:black;
}
.footer a{
  color:black;
  text-decoration: underline;
}
hr {
  color: #650101;
  margin-left: 15px;
  margin-right: 15px;
  border: none;
  border-top: 5px solid;
}
```

## CRUD Categorías
En esta sección se va a trabajar sobre el CRUD de las categorías. En primer lugar se han modificado el comportamiento de varios componentes. Ya los *BloqueTaza* y *BloquePostre* no formarán parte del *App.tsx* principal, ya que en este componente irá un nuevo componente *EntradaCategoria.tsx*:
```javascript
  <div className="carta">
    <Header />
    <EntradaCategoria />
    <Footer />
  </div>
```
### EntradaCategoria
En este componente es donde se gestionarán los bloques de cada categoría, por lo que *BloqueTaza* y *BloquePostre* se renderizarán desde aquí. 

En primer lugar se empleará **useState** para el manejo de las propiedades de los componentes y se definen las *'variables'* para manejar los productos, los nombres y los precios:
```javascript
import { useState } from 'react';
// ...resto de código...
const [productos, setProductos] = useState<Producto[]>([]); // listar productos
const [nuevoNombre, setNuevoNombre] = useState(""); // Definir nuevos nombres de producto
const [nuevoPrecio, setNuevoPrecio] = useState(""); // Definir nuevos precios de producto
```
A continuación se definen las funciones para agregar, editar y eliminar categorías.

#### Agregar Categoría
Para esta función se define en la función flecha el id, el nombre de la categoría y el nuevo tipo:

```javascript
const agregarCategoria = () => {
    const nueva: Categoria ={
        id: categorias.length + 1,
        nombre: nuevaCategoria,
        tipo: 'nueva'
    };

    setCategorias([...categorias, nueva]);
    setNuevaCategoria("");
};
```
Se puede apreciar que se establece la forma en la que se crea una nueva categoría siguiendo el patrón especificado en la *interface **Categorias***. Se define un id, que suma 1 al valor anterior, un nuevo nombre haciendo uso del *useState* y al ser un nuevo bloque no existente (como Taza o Postre) se define como *nueva*.

#### Editar Categoría
Para esta uso de la app se van a emplear dos funciones:
```javascript
  const iniciarEdicion = (id: number, nombre: string) => {
      setEditandoId(id);
      setNombreEditado(nombre);
  }

const editarCategoria = (id: number, nuevoNombre: string) => {
    setCategorias(categorias.map(categoria => 
        categoria.id === id ? {...categoria, nombre: nuevoNombre} : categoria
    ));
    setEditandoId(null);
    setNombreEditado("");
}
```
En primer lugar se encuentra *iniciarEdicion* que se inicia al pulsar el botón de **Editar Categoría** y recibe el nuevo nombre de la categoría del id seleccionado.

Seguidamente se encuentra *editarCategoria* dónde se guarda en el id seleccionado el nuevo nombre recibido al pulsar en **Guardar**, empleando un map para mantener el resto de las propiedades intactas.

#### Eliminar Categoría
Para esta fucion vamos a usar el arreglo **filter**. Este arreglo nos va a mostrar por pantalla solo los componentes del 'array' de las categorías que le indiquemos. En este caso se le dice que nos muestre aquellos id que no hayan sido seleccionados con *eliminar*
```javascript
const eliminarCategoria = (id: number) => {
    setCategorias(categorias.filter(categoria => categoria.id !== id));
};
```

#### return EntradaCategorias
En el retorno de la función se verán las siguientes propiedades:
- Input para introducir categorías
- Input para edición de la categoría
- Bloques de cada categoría
- Botones para editar y modificar

En primer lugar se define el bloque para añadir categorías a la carta:
```javascript
<div className="añadirCategoria">
    <input
        type="text"
        value = {nuevaCategoria}
        onChange={(i) => setNuevaCategoria(i.target.value)}
        placeholder='Añadir nueva categoría...' />
    <button onClick={agregarCategoria}>Añadir Categoría</button>
</div>
```
Simplemente se define un cuadro *input* para agregar el nombre de la nueva categoría y un botón para añadir.

En el siguiente bloque se define el nuevo nombre de la categoría **solamente** si le damos a botón de editar:
```javascript
{categorias.map((categoria) => (
  <div key={categoria.id} className='bloqueCategoria'>
      {editandoId === categoria.id ? (
          <div className='editarCategoria'>
              <input
                  type='text'
                  value={nombreEditado}
                  onChange={(i) => setNombreEditado(i.target.value)}/>
              <button 
                  onClick={() => editarCategoria(categoria.id, nombreEditado)}
                  className='boton-guardar'>
                  Guardar
              </button>
          </div>
      ) : (
          <h3>{categoria.nombre}</h3>
      )}
```
Con un map recorremos los *ids** existentes y, si existe, se habilita un *input* en el título de la categoría para editarla. A continuación aparecerá un botón para guardar y ya se obtiene el nuevo nombre de la categoría.

Más adelante encontramos los componentes ya conocidos más un nuevo componente, que se explicará más adelante:
```javascript
{categoria.tipo === 'bebidas' ? (<BloqueTaza />) 
: categoria.tipo === 'postre' ? (<BloquePostre />)
: (<BloqueNuevaCategoria />)}
```
Y finalmente se encuentran los botones para editar y eliminar:
```javascript
<div className='botones-categoria'>
    <button
        onClick={() => iniciarEdicion(categoria.id, categoria.nombre)}
        className='boton-editar'>
        Editar Categoria
    </button>
    <button
        onClick={() => eliminarCategoria(categoria.id)}
        className="boton-eliminar">
        Eliminar Categoría - {categoria.nombre}
    </button>
</div>
```
Estos botónes afectan a cada bloque, es decir, cada categoría va a tener sus botones de edición y eliminar y funcionan de la siguiente manera:
- Editar: llama a la funcion *iniciarEdicion* y selecciona el id de la categoría y el nombre de la misma
- Eliminar: llama a la función *eliminarCategoría* y elimina el id de la categoría correspondiente.

## CRUD Productos
En esta sección se va a tratar el crud para cada componente. Se ha empleado varios *CRUD* por separado:
- En los componentes predefinidos Taza y Postre
- En un nuevo componente para agregar productos a las nuevas categorías explicadas anteriormente

Ambos *CRUD*, aunque empleados en distintos componentes, funcionan de la misma manera, así que se procederá a explicar el *CRUD* desde el nuevo componente ***BloqueNuevaCategoria***.

### Añadir Producto
Para la creación de nuevos productos primero se van a inicializar los siguientes useState:
```javascript
const [productos, setProductos] = useState<Producto[]>([]); // listar productos
const [nuevoNombre, setNuevoNombre] = useState(""); // Definir nuevos nombres de producto
const [nuevoPrecio, setNuevoPrecio] = useState(""); // Definir nuevos precios de producto
```
- Se incia un array para almacenar los productos
- Se definen los nombres
- Se definen los precios

A continuación se define la función para poder añadir:
```javascript
const anadirProducto = () => {
    if(productos.length < 6){

        const nuevoProducto = {
            nombre: nuevoNombre, 
            precio: parseFloat(nuevoPrecio),
        };

        setProductos([...productos, nuevoProducto]);
        setNuevoNombre("");
        setNuevoPrecio("");

    } else {
        alert("máximo de 6 artículos alcanzado");
    }
}
```
* En este caso se ha decicido establecer el máximo de productos a 6

Siempre que no superemos el límite de 6, se iniciará un diccionario en que indicaremos nombre y precio. A continuación se hará uso del useState para definir un nuevo producto o listar los existentes y añadir uno nuevo. Seguidamente se reiniciarán los formularios.

La implementación de este bloque se hace de la siguiente forma:
```javascript
<input 
    type="text"
    placeholder="Nombre del producto..."
    value={nuevoNombre}
    onChange={(e) => setNuevoNombre(e.target.value)}
    />
<input 
    type="number"
    placeholder="Precio del producto..."
    value={nuevoPrecio}
    onChange={(e) => setNuevoPrecio(e.target.value)}
/>
<button onClick = {anadirProducto}>Añadir</button>
```
- Se añade un input para el precio...
- ...otro diferente para producto
- Botón añadir que llama la funcion añadirProducto


### Editar Producto
De manera similar al anterior apartado, se definen una serie de useState:
```javascript
const [editandoId, setEditandoId] = useState<number | null>(null); // Seleccionar id para editar
const [nombreEditado, setNombreEditado] = useState(""); 
const [precioEditado, setPrecioEditado] = useState("");
```
- Primero accedermos al id del producto a editar
- Se definen nuevo nombre y precio

Como se hizo en *categorias* se usarán dos funciones: una para acceder y editar los datos y otra para guardarlos:
```javascript
const iniciarEdicion = (index: number, producto: Producto) => {
    setEditandoId(index);
    setNombreEditado(producto.nombre);
    setPrecioEditado(producto.precio.toString());
};

const guardarEdicion = (index: number) => {
    const ProductosActualizados = productos.map((producto, i) => {
        if(i === index){
            return {
                nombre: nombreEditado,
                precio: parseFloat(precioEditado)
            };
        }
        return producto;
    });
    setProductos(ProductosActualizados);
    setEditandoId(null);
    setNombreEditado("");
    setPrecioEditado("");
};
```
En *iniciarEdicion* se accede al id del producto (accedemos a su posición en el array...) y se define el nuevo nombre y precio

A continuación, en *guardarEdicion*, recorremos el array de productos hasta dar con el que se está editando, se almacenan en la variable *ProductosActualizados* y se devuelven en el useState *setProductos*. Finalmente se reinician los formularios.

La implementación de este bloque es la siguiente:
```javascript
{productos.map((producto, index) => (
    <div key={index} className='lista'>
        {editandoId === index ? (
            <div>
                <input
                    type='text'
                    value={nombreEditado}
                    onChange={(i) => setNombreEditado(i.target.value)}
                />
                <input
                    type='number'
                    value={precioEditado}
                    onChange={(i) => setPrecioEditado(i.target.value)}
                />
                <button
                    onClick={() => guardarEdicion(index)}
                    className='boton-guardar'
                >
                    Guardar
                </button>
            </div>
        ) : (
            <div>
                <span>{producto.nombre}</span>
                <span>{producto.precio}€</span>
                <button
                    onClick={() => iniciarEdicion(index, producto)}
                    className='boton-editar'
                >
                    Editar
                </button>
```
En primer lugar, y como se hiciera con *BloqueTaza* y *BloquePostre*, para listar los productos de la nueva categoría, se emplea un map que recorrerá el array de productos existentes. En segundo lugar encontramos los inputs para modificar los productos, solo disponibles después de pulsar el botón de editar. Finalmente se listan los productos existentes.

### Eliminar Producto 
Para eliminar un producto se emplea la misma estrategia que con *categorias*: se usa un arreglo **filter** para mostrar solo aquellos productos que no han sido seleccionados como *'eliminados'*:
```javascript
const eliminarProducto = (index: number) => {
    const nuevosProductos = productos.filter((_, i: number) => i !== index);
    setProductos(nuevosProductos);
}
```
La implementación es sencilla, simplemente un botón que llame a la función:
```javascript
<button
    onClick={() => eliminarProducto(index)}
    className='boton-eliminar'
>
    Eliminar
</button>
```

*Como se dijo anteriormente, en los componentes *BloqueTaza* y *BloquePostre* se emplean las mismas funciones que el componente *'vacio'*

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

## Resultado final de App.tsx
Una vez definidos los **componentes**, el resultado del fichero principal se debería ver de la siguiente manera:
```javascript
import './App.css'
import Header from './components/Header'
import EntradaCategoria from './components/EntradaCategoria'
import Footer from './components/Footer';

export default function App() {
  return (
    <div className='contenedor'>
      <img className="fondo" src="./images/beans.jpg" alt='Granos de café' />
      <div className="carta">
        <Header />
        <EntradaCategoria />
        <Footer />
      </div>
    </div>
  )
}
```

## Repositorio
https://github.com/MynameisJoni/UT2-carta-restaurante