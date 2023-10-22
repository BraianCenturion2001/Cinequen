import React from 'react'
import { CardPelicula2 } from '../CardPelicula';
import { TablePreciosEntradas } from '../TablePreciosEntradas';

export function Paso1Entradas(props) {
    const { cantidadEntradas, setCantidadEntradas, precioEntradas, setPrecioEntradas, funcion } = props;
    return (
        <>
            <CardPelicula2 funcion={funcion} />
            <TablePreciosEntradas
                cantidadEntradas={cantidadEntradas}
                setCantidadEntradas={setCantidadEntradas}
                precioEntradas={precioEntradas}
                setPrecioEntradas={setPrecioEntradas}
                precioBase={funcion.sala_data.precio_entrada}
            />
        </>
    )
}
