import React from 'react'
import { TextField } from "@mui/material"
import { CardPelicula2 } from '../CardPelicula';

export function Paso1Entradas(props) {
    const { cantidadEntradas, setCantidadEntradas, precioEntradas, setPrecioEntradas, funcion } = props;
    return (
        <>
            <CardPelicula2 funcion={funcion} />
            <TextField
                id="outlined-number"
                label="Cantidad de Entradas"
                type="number"
            />
        </>
    )
}
