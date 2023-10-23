import { BASE_API } from "../utils/constants";

export async function getButacasxFuncionApi(id) {
    try {
        const url = `${BASE_API}/api/butacasxfuncion/?funcion=${id}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function updateButacaxFuncionApi(id, data, token) {
    try {
        const url = `${BASE_API}/api/butacasxfuncion/${id}/`;
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
