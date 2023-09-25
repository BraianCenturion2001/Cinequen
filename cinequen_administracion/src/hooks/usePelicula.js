import { useState } from "react";
import { useAuth } from ".";
import { getPeliculasApi, addPeliculaApi, updatePeliculaApi, deletePeliculaApi } from "../api/peliculas";

export function usePelicula() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [peliculas, setPeliculas] = useState(null);

    const { auth } = useAuth();

    const getPeliculas = async () => {
        try {
            setLoading(true)
            const response = await getPeliculasApi();
            setLoading(false)
            setPeliculas(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addPelicula = async (data) => {
        try {
            setLoading(true)
            await addPeliculaApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const updatePelicula = async (id, data) => {
        try {
            setLoading(true)
            await updatePeliculaApi(id, data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const deletePelicula = async (id) => {
        try {
            setLoading(true)
            await deletePeliculaApi(id, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        peliculas,
        getPeliculas,
        addPelicula,
        updatePelicula,
        deletePelicula,

    };
}
