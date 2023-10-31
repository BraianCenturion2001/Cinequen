import { BASE_API } from "../utils/constants";

export async function getEntradasApi() {
    try {
        const url = `${BASE_API}/api/entradas/`;
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
