import { BASE_API } from "../utils/constants";

export async function getFuncionesApi() {
    try {
        const url = `${BASE_API}/api/funciones/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getFuncionesEstablecimientoApi(id) {
    try {
        const url = `${BASE_API}/api/funciones/?sala__establecimiento=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addFuncionApi(data, token) {
    try {
        const url = `${BASE_API}/api/funciones/`;
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

