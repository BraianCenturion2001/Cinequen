import { BASE_API } from "../utils/constants";


export async function getEstablecimientosApi() {
    try {
        const url = `${BASE_API}/api/establecimientos/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addEstablecimientoApi(data, token) {
    try {
        const url = `${BASE_API}/api/establecimientos/`;
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

export async function updateEstablecimientoApi(id, data, token) {
    try {
        const url = `${BASE_API}/api/establecimientos/${id}/`;
        const params = {
            method: "PATCH",
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

export async function deleteEstablecimientoApi(id, token) {
    try {
        const url = `${BASE_API}/api/establecimientos/${id}/`;
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
