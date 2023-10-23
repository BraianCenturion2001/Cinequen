import { useState } from "react";
import { getButacasxFuncionApi, updateButacaxFuncionApi } from "../api/butacasxfuncion";
import { useAuth } from ".";

export function useButacasFuncion() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [butacasFuncion, setButacasFuncion] = useState(null);
    const { auth } = useAuth();

    const getButacasFuncion = async (id) => {
        try {
            setLoading(true)
            const response = await getButacasxFuncionApi(id);
            setButacasFuncion(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const updateButacaFuncion = async (id, data) => {
        try {
            setLoading(true)
            await updateButacaxFuncionApi(id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }


    return {
        loading,
        error,
        butacasFuncion,
        getButacasFuncion,
        updateButacaFuncion,

    };
}