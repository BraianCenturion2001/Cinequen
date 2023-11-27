import { BASE_API } from "../utils/constants";

export async function getChartsApi(params = {}) {
    try {
        const url = new URL(`${BASE_API}/api/barts/`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getDonaApi(params = {}) {
    try {
        const url = new URL(`${BASE_API}/api/dona/`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getLinesApi(params = {}) {
    try {
        const url = new URL(`${BASE_API}/api/lines/`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

