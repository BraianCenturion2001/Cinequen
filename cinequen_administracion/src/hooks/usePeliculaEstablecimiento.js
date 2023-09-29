import { useState } from "react";
import { getPeliculasEstablecimientosApi, getPeliculasEstablecimientosFiltro1Api, getPeliculasEstablecimientosFiltro2Api, addPeliculasEstablecimientoApi } from "../api/funcionesxestablecimientos";
import { useAuth } from ".";

export function usePeliculaEstablecimiento() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [peliculasEstablecimientos, setPeliculasEstablecimientos] = useState(null);
    const { auth } = useAuth();

    const getPE = async () => {
        try {
            setLoading(true)
            const response = await getPeliculasEstablecimientosApi();
            setLoading(false)
            setPeliculasEstablecimientos(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getPEFiltro1 = async (id) => {
        try {
            setLoading(true)
            const response = await getPeliculasEstablecimientosFiltro1Api(id);
            setLoading(false)
            setPeliculasEstablecimientos(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getPEFiltro2 = async (id) => {
        try {
            setLoading(true)
            const response = await getPeliculasEstablecimientosFiltro2Api(id);
            setLoading(false)
            setPeliculasEstablecimientos(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addPeliculasEstablecimiento = async (data) => {
        try {
            setLoading(true)
            await addPeliculasEstablecimientoApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        peliculasEstablecimientos,
        getPE,
        getPEFiltro1,
        getPEFiltro2,
        addPeliculasEstablecimiento,

    };
}
