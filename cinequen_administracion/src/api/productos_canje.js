import { BASE_API } from "../utils/constants";


export async function getProductosCanjeApi() {
    try {
        const url = `${BASE_API}/api/productos_canje/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addProductoCanjeApi(data, token) {
    try {
        const formData = new FormData();
        formData.append('imagen', data.imagen);
        formData.append('nombre', data.nombre);
        formData.append('tipo', data.tipo);
        formData.append('descripcion', data.descripcion);
        formData.append('precio_puntos', data.precio_puntos);
        formData.append('stock', data.stock);

        const url = `${BASE_API}/api/productos_canje/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function updateProductoCanjeApi(id, data, token) {
    try {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('tipo', data.tipo);
        formData.append('descripcion', data.descripcion);
        formData.append('precio_puntos', data.precio_puntos);
        formData.append('stock', data.stock);

        if (data.imagen) formData.append('imagen', data.imagen);

        const url = `${BASE_API}/api/productos_canje/${id}/`;
        const params = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

/* 
export async function getPeliculasExcludeEstablecimientoApi(id) {
    try {
        const url = `${BASE_API}/api/peliculas/?establecimiento__exclude=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
} */

