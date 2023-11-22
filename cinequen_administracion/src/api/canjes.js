import { BASE_API } from "../utils/constants";

export async function getCanjesApi(params = {}) {
    try {
        const url = new URL(`${BASE_API}/api/canjes/`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addCanjeApi(data, token) {
    try {
        const url = `${BASE_API}/api/canjes/`;
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