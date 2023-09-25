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
