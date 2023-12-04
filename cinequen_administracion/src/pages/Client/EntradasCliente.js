import React, { useEffect } from 'react';
import { Loader } from "semantic-ui-react"
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
                    <TablaEntradas entradas={entradas} />
                )
            }
        </>
    )
}
