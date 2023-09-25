import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableEstablecimientos } from "../../components/Admin"
import { useEstablecimiento } from "../../hooks"

export function EstablecimientosAdmin() {

    const { loading, establecimientos, getEstablecimientos } = useEstablecimiento();

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
                <TableEstablecimientos establecimientos={establecimientos} />
            )}
        </>
    )
}
