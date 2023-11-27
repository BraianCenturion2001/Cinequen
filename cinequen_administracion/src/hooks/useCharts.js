import { useState } from "react";
import { getChartsApi, getDonaApi, getLinesApi } from "../api/charts";

export function useCharts() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataBarts, setDataBarts] = useState(null);
    const [dataDona, setDataDona] = useState(null);
    const [dataLines, setDataLines] = useState(null);

    const getBarts = async (params) => {
        try {
            setLoading(true)
            const response = await getChartsApi(params);
            setLoading(false)
            setDataBarts(response);
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
            setDataDona(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const getLines = async (params) => {
        try {
            setLoading(true)
            const response = await getLinesApi(params);
            setLoading(false)
            setDataLines(response);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    return {
        loading,
        error,
        dataBarts,
        dataDona,
        dataLines,
        getBarts,
        getDona,
        getLines,
    };
}