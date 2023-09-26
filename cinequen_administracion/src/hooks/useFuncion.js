import { useState } from "react";
import { getFuncionesApi, addFuncionApi } from "../api/funciones";
import { useAuth } from ".";

export function useFuncion() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [funciones, setFunciones] = useState(null);
    const { auth } = useAuth();

    const getFunciones = async () => {
        try {
            setLoading(true)
            const response = await getFuncionesApi();
            setLoading(false)
            setFunciones(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addFuncion = async (data) => {
        try {
            setLoading(true)
            await addFuncionApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        funciones,
        getFunciones,
        addFuncion,

    };
}
