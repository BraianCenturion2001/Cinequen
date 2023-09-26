import { useState } from "react";
import { getEstablecimientosApi, addEstablecimientoApi, updateEstablecimientoApi, deleteEstablecimientoApi } from "../api/establecimientos";
import { useAuth } from ".";

export function useEstablecimiento() {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [establecimientos, setEstablecimientos] = useState(null);

    const getEstablecimientos = async () => {
        try {
            setLoading(true)
            const response = await getEstablecimientosApi();
            setLoading(false)
            setEstablecimientos(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addEstablecimiento = async (data) => {
        try {
            setLoading(true)
            await addEstablecimientoApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const updateEstablecimiento = async (id, data) => {
        try {
            setLoading(true)
            await updateEstablecimientoApi(id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const deleteEstablecimiento = async (id) => {
        try {
            setLoading(true)
            await deleteEstablecimientoApi(id, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }


    return {
        loading,
        error,
        establecimientos,
        getEstablecimientos,
        addEstablecimiento,
        updateEstablecimiento,
        deleteEstablecimiento,

    };
}
