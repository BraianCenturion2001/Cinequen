import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

export function CardPelicula2(props) {
    const { funcion } = props
    return (
        <Card sx={{ display: 'flex', width: '500px', marginBottom: '30px' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={funcion.pelicula_data.poster}
                alt={funcion.pelicula_data.nombre}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4">
                        {funcion.pelicula_data.nombre}
                    </Typography>
                    <Typography component="div" color="success" variant="h5">
                        {formatFecha(funcion.fecha)} | {funcion.hora_inicio.substring(0, 5)}hs
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {funcion.sala_data.establecimiento_data.nombre} - {funcion.sala_data.nombre}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

function formatFecha(fecha) {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(fecha);
    const dia = date.toLocaleDateString('es-ES', options).split(',')[0].toUpperCase();
    const numero = date.getDate();
    const mes = date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
    return `${dia} ${numero} ${mes}`;
}
