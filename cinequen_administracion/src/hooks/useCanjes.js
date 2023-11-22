import { useState } from "react";
import { addCanjeApi, getCanjesApi } from "../api/canjes";
import { useAuth } from ".";

export function usePeliculaEstablecimiento() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canjes, setCanjes] = useState(null);
    const { auth } = useAuth();

    const getCanjes = async (params) => {
        try {
            setLoading(true)
            const response = await getCanjesApi(params);
            setLoading(false)
            setCanjes(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addCanje = async (data) => {
        try {
            setLoading(true)
            await addCanjeApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        canjes,
        addCanje,
        getCanjes,

    };
}