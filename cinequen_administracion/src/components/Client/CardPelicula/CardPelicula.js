import React from 'react';
import "./CardPelicula.scss";
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActionArea, Typography, Box } from '@mui/material';

export function CardPelicula(props) {
    const { pelicula } = props;

    return (
        <Card elevation={3}>
            <CardActionArea component={Link} to={`/funciones/pelicula/${pelicula.id}`}>
                <CardMedia component="img" height="300" image={pelicula.poster} alt={pelicula.nombre} />
                <CardContent>
                    <Box display="flex" alignItems="center">
                        <h2><i class="fa-duotone fa-film"></i></h2>
                        <Box ml={1}>
                            <Typography component="div" variant="h5">
                                {pelicula.nombre}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <i class="fa-duotone fa-clock-rotate-left" style={{ marginRight: '5px' }}></i>{`Duración: ${formatDuracion(pelicula.duracion)}`}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function formatDuracion(duracion) {
    const horas = Math.floor(duracion / 60);
    const minutos = duracion % 60;
    return `${horas}:${minutos.toString().padStart(2, '0')}hs`;
}