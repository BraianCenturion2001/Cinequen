import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage } from "../../components/Admin"
import { useEstablecimiento } from "../../hooks"

export function EstablecimientosAdmin() {

    const { loading, establecimientos, getEstablecimientos } = useEstablecimiento();

    console.log(establecimientos);
    useEffect(() => {
        getEstablecimientos();
    }, [])


    return (
        <>
            <HeaderPage title="Establecimientos" btnTitle="Nuevo establecimiento" />

            {loading ? (
                <Loader active inline="centered">
                    Cargando
                </Loader>
            ) : (
                <h2>Lista de Establecimientos</h2>
            )}
        </>
    )
}
