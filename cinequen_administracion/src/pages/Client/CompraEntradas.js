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
    }, []);

    useEffect(() => {
        if (!loading) {
            setFuncion(funciones);
        }
    }, [loading, funciones]);


    return (
        <>
            {
                loading ? (
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
