import { useState } from "react";
import { getEntradasApi, insertEntradaApi } from "../api/entradas";
import { useAuth } from ".";

export function useEntrada() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [entradas, setEntradas] = useState(null);
    const { auth } = useAuth();

    const getEntradas = async (id) => {
        try {
            setLoading(true)
            const response = await getEntradasApi(id);
            setEntradas(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const insertEntrada = async (data) => {
        try {
            const requestData = { ...data, user: auth.me.user_data.id };
            setLoading(true);
            const response = await insertEntradaApi(requestData, auth.token);
            console.log(response.qr_value);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        loading,
        error,
        entradas,
        getEntradas,
        insertEntrada,

    };
}