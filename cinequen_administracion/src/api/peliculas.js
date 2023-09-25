import { BASE_API } from "../utils/constants";


export async function getPeliculasApi() {
    try {
        const url = `${BASE_API}/api/peliculas/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addPeliculaApi(data, token) {
    try {
        const formData = new FormData();
        formData.append('poster', data.poster);
        formData.append('nombre', data.nombre);
        formData.append('duracion', data.duracion);
        formData.append('video_trailer', data.video_trailer);
        formData.append('actores', data.actores);
        formData.append('director', data.director);
        formData.append('genero', data.genero);
        formData.append('origen', data.origen);
        formData.append('distribuidor', data.distribuidor);
        formData.append('tipo', data.tipo);
        formData.append('clasificacion', data.clasificacion);
        formData.append('descripcion_corta', data.descripcion_corta);
        formData.append('descripcion_larga', data.descripcion_larga);

        const url = `${BASE_API}/api/peliculas/`;
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

export async function updatePeliculaApi(id, data, token) {
    try {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('duracion', data.duracion);
        formData.append('video_trailer', data.video_trailer);
        formData.append('tipo', data.tipo);
        formData.append('clasificacion', data.clasificacion);
        formData.append('descripcion_corta', data.descripcion_corta);

        if (data.actores) formData.append('actores', data.actores);
        if (data.director) formData.append('director', data.director);
        if (data.genero) formData.append('genero', data.genero);
        if (data.origen) formData.append('origen', data.origen);
        if (data.distribuidor) formData.append('distribuidor', data.distribuidor);
        if (data.descripcion_larga) formData.append('descripcion_larga', data.descripcion_larga);
        if (data.poster) formData.append('poster', data.poster);

        const url = `${BASE_API}/api/peliculas/${id}/`;
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

export async function deletePeliculaApi(id, token) {
    try {
        const url = `${BASE_API}/api/peliculas/${id}/`;
        const params = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}


