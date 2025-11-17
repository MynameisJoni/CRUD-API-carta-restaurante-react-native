const URL = 'https://jlorenzo.ddns.net/carta_restaurante';
const USER = '3005';

export async function getCategorias(){
    const response = await fetch(`${URL}/categorias/?usuario_id=${USER}`);
    if(!response.ok){
        throw new Error("Error obteniendo categorias");
    } else {
        const data = await response.json();
        return (data.data || []).map((cat: any) => ({
            id: Number(cat.id ?? cat.categoria_id),
            nombre: cat.nombre
        }));
    }
}

export async function postCategorias(nombre: string){
    const response = await fetch(`${URL}/categorias/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER,
            nombre:nombre
        })
    });
    if(!response.ok){
        throw new Error('Error creando categoría');
    }
    const data = await response.json();
    return {
        id: Number(data.categoria_id),
        nombre: nombre
    }
}

export async function putCategoria(id: number, nombre:string){
    const response = await fetch(`${URL}/categorias/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER,
            nombre: nombre
        })
    });
    if(!response.ok){
        throw new Error('Error al actualizar categoria')
    }
    return await response.json();
}

export async function deleteCategoria(id:number){
    const response = await fetch(`${URL}/categorias/${id}?usuario_id=${USER}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ usuario_id: USER })
    });
    if(!response.ok){
        throw new Error('Error al eliminar categoria')
    }
    return await response.json();
}

export async function getProductos(categoriaId: number){
    const response = await fetch(`${URL}/productos/${categoriaId}?usuario_id=${USER}`);
    if(!response.ok){
        throw new Error("Error obteniendo productos");
    }
    const data = await response.json();
    return (data.data || []).map((prod: any) => ({
        id: Number(prod.id ?? prod.producto_id),
        nombre: prod.nombre,
        precio: Number(prod.precio ?? 0)
    }));
}

export async function postProductos(categoriaId: number, nombre: string, precio: number){
    const response = await fetch(`${URL}/productos/${categoriaId}`, {
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
    });
    
    if(!response.ok){
        throw new Error('Error creando producto');
    }
    const data = await response.json();
    
    return {
        id: Number(data.producto_id ?? data.id ?? 0),
        nombre: nombre,
        precio: precio
    };
}

export async function putProductos(id: number, nombre:string, precio: number){
    const response = await fetch(`${URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER,
            nombre: nombre,
            precio: precio
        })
    });
    if(!response.ok){
        throw new Error('Error al actualizar producto')
    }
    return await response.json();
}

export async function deleteProductos(id:number){
    const response = await fetch(`${URL}/productos/${id}?usuario_id=${USER}`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: USER })
    });
    if(!response.ok){
        throw new Error('Error al eliminar producto')
    }
    return await response.json();
}