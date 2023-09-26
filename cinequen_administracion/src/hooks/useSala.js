import { useState } from "react";
import { getSalasApi } from "../api/salas";
/* import { useAuth } from "."; */

export function useSala() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [salas, setSalas] = useState(null);
    /*  const { auth } = useAuth(); */

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

    return {
        loading,
        error,
        salas,
        getSalas,

    };
}
