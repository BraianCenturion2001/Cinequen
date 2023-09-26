import { useState } from "react";
import { getSalasApi, addSalaApi, updateSalaApi, deleteSalaApi, getSalasEstablecimientoApi } from "../api/salas";
import { useAuth } from ".";

export function useSala() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [salas, setSalas] = useState(null);
    const { auth } = useAuth();

    const getSalas = async () => {
        try {
            setLoading(true)
            const response = await getSalasApi();
            setLoading(false)
            setSalas(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getSalasEstablecimiento = async (id) => {
        try {
            setLoading(true)
            const response = await getSalasEstablecimientoApi(id);
            setLoading(false)
            setSalas(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addSala = async (data) => {
        try {
            setLoading(true)
            await addSalaApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const updateSala = async (id, data) => {
        try {
            setLoading(true)
            await updateSalaApi(id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const deleteSala = async (id) => {
        try {
            setLoading(true)
            await deleteSalaApi(id, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        salas,
        getSalas,
        addSala,
        updateSala,
        deleteSala,
        getSalasEstablecimiento,

    };
}
