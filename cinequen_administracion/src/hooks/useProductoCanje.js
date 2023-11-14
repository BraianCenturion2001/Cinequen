import { useState } from "react";
import { useAuth } from ".";
import { getProductosCanjeApi, addProductoCanjeApi, updateProductoCanjeApi } from "../api/productos_canje";

export function useProductoCanje() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productos, setProductos] = useState(null);

    const { auth } = useAuth();

    const getProductosCanje = async () => {
        try {
            setLoading(true)
            const response = await getProductosCanjeApi();
            setLoading(false)
            setProductos(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const addProductoCanje = async (data) => {
        try {
            setLoading(true)
            await addProductoCanjeApi(data, auth.token);
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    const updateProductoCanje = async (id, data) => {
        try {
            setLoading(true);
            await updateProductoCanjeApi(id, data, auth.token);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    }

    return {
        loading,
        error,
        productos,
        getProductosCanje,
        addProductoCanje,
        updateProductoCanje,

    };
}
