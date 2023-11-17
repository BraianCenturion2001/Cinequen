import { BASE_API } from "../utils/constants";

export async function loginApi(formValue) {
    try {
        const url = `${BASE_API}/api/auth/login/`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        }

        const response = await fetch(url, params)

        console.log(response.status)

        if (response.status !== 200) {
            if (response.status === 401) {
                throw new Error("Usuario o contraseña inválidos")
            } else if (response.status === 400) {
                throw new Error("Usuario no verificado, por favor revise su bandeja de entrada.")
            }
        }

        var respuesta = await response.json()
        return respuesta
    } catch (error) {
        throw error
    }
}

export async function RegisterApi(formValue) {
    try {
        const url = `${BASE_API}/api/auth/register/`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValue)
        }

        const response = await fetch(url, params)

        if (response.status !== 201) {
            throw new Error("Valores ingresados inválidos")
        }

        return response.status
    } catch (error) {
        throw error
    }
}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

export async function getUsersApi(token) {
    try {
        const url = `${BASE_API}/api/users`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function addUserApi(data, token) {
    try {
        const url = `${BASE_API}/api/users/`;
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

export async function updateUserApi(id, data, token) {
    try {
        const url = `${BASE_API}/api/users/${id}/`;
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

export async function deleteUserApi(id, token) {
    try {
        const url = `${BASE_API}/api/users/${id}/`;
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
