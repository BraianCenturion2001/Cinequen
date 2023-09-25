import { useState } from "react";
import { getEstablecimientosApi } from "../api/establecimientos";

export function useEstablecimiento() {
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



    return {
        loading,
        error,
        establecimientos,
        getEstablecimientos,
    };
}
