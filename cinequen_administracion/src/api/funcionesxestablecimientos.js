import { BASE_API } from "../utils/constants";

export async function getPeliculasEstablecimientosApi() {
    try {
        const url = `${BASE_API}/api/peliculasxestablecimientos/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPeliculasEstablecimientosFiltro1Api(id) {
    try {
        const url = `${BASE_API}/api/peliculasxestablecimientos/?establecimiento=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPeliculasEstablecimientosFiltro2Api(id) {
    try {
        const url = `${BASE_API}/api/peliculasxestablecimientos/?pelicula=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addPeliculasEstablecimientoApi(data, token) {
    try {
        const url = `${BASE_API}/api/peliculasxestablecimientos/`;
        const params = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}