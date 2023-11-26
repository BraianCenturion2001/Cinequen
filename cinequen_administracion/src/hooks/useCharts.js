import { useState } from "react";
import { getChartsApi, getDonaApi } from "../api/charts";

export function useCharts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getBarts = async (params) => {
        try {
            setLoading(true)
            const response = await getChartsApi(params);
            setLoading(false)
            setData(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getDona = async (params) => {
        try {
            setLoading(true)
            const response = await getDonaApi(params);
            setLoading(false)
            setData(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    return {
        loading,
        error,
        data,
        getBarts,
        getDona,

    };
}