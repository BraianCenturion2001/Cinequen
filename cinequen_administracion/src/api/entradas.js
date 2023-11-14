import { BASE_API } from "../utils/constants";

export async function getEntradasApi(params = {}) {
    try {
        const url = new URL(`${BASE_API}/api/entradas/`);
        // Agregar parámetros a la URL
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        console.log(url)
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function insertEntradaApi(data, token) {
    try {
        const response = await fetch(`${BASE_API}/api/entradas/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
