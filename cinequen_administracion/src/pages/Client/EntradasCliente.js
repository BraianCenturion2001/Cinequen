import React, { useEffect } from 'react';
import { Loader } from "semantic-ui-react"
import { Typography, Box } from "@mui/material"
import { useEntrada, useAuth } from "../../hooks"
import { TablaEntradas } from "../../components/Client"


export function EntradasCliente() {
    const { entradas, getEntradas, loading } = useEntrada();
    const { auth } = useAuth();

    useEffect(() => {
        const userId = auth.me.user_id;
        getEntradas({ user: userId });
        document.title = 'Mis Entradas';
    }, []);

    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    entradas.length > 0 ? (
                        <TablaEntradas entradas={entradas} />
                    ) : (
                        <Box sx={{
                            width: '90%', padding: "30px", margin: '0 auto', marginTop: "15px", backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '15px',
                        }}>
                            <Typography variant="h3" align="center">Sin entradas registradas.</Typography>
                        </Box>
                    )

                )
            }
        </>
    )
}
