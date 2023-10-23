import React from 'react'
import { RenderButacas } from "../RenderButacas"

export function Paso2Butacas(props) {
    const { cantidadEntradas, butacasIds, setButacasIds, funcion } = props;
    return (
        <>
            <RenderButacas
                id={funcion.id}
                tipoSala={funcion.sala_data.tipo}
                setButacasIds={setButacasIds}
                butacasIds={butacasIds}
                cantidadEntradas={cantidadEntradas}
            />
        </>
    )
}
