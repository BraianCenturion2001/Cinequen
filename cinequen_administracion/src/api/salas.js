import { BASE_API } from "../utils/constants";

export async function getSalasApi() {
    try {
        const url = `${BASE_API}/api/salas/`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}


