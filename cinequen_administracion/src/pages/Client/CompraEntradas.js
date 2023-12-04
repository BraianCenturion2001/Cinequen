import React, { useEffect, useState } from 'react'
import { FormCompraEntradas } from '../../components/Client'
import { useParams } from 'react-router-dom';
import { useFuncion } from '../../hooks'
import { Box, CircularProgress } from '@mui/material';


export function CompraEntradas() {
    const { id } = useParams();
    const [funcion, setFuncion] = useState(null)
    const { loading, funciones, getFuncion } = useFuncion();

    useEffect(() => {
        getFuncion(id);
        document.title = 'Comprar Entradas';
    }, []);

    useEffect(() => {
        if (!loading) {
            setFuncion(funciones);
        }
    }, [loading, funciones]);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowForm(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const isLoading = loading || !showForm;

    return (
        <>
            {
                isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <FormCompraEntradas funcion={funcion} />
                )
            }
        </>
    )
}
