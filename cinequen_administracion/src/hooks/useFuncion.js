import { useState } from "react";
import { getFuncionesApi, addFuncionApi, getFuncionesEstablecimientoApi, getFuncionesPeliculaApi, getFuncionApi, updateFuncionApi } from "../api/funciones";
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

    const getFuncion = async (id) => {
        try {
            setLoading(true)
            const response = await getFuncionApi(id);
            setFunciones(response);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getFuncionesEstablecimiento = async (id) => {
        try {
            setLoading(true)
            const response = await getFuncionesEstablecimientoApi(id);
            setLoading(false)
            setFunciones(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getFuncionesPelicula = async (id) => {
        try {
            setLoading(true)
            const response = await getFuncionesPeliculaApi(id);
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

    const updateFuncion = async (id, data) => {
        try {
            setLoading(true)
            await updateFuncionApi(id, data, auth.token);
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
        getFuncion,
        getFunciones,
        addFuncion,
        getFuncionesEstablecimiento,
        getFuncionesPelicula,
        updateFuncion
    };
}
