import React from 'react';
import "./CardPelicula.scss";
import { Link } from 'react-router-dom';
import { Card, CardActionArea, Typography, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';

export function CardPelicula(props) {
    const { pelicula } = props;

    return (
        <Card elevation={3}>
            <CardActionArea component={Link} to={`/funciones/pelicula/${pelicula.id}`}>
                <ImageListItem style={{ height: '315px' }}>
                    <img
                        srcSet={pelicula.poster}
                        src={pelicula.poster}
                        alt={pelicula.nombre}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={pelicula.nombre}
                        subtitle={
                            <Typography component="div">
                                <i className="fa-duotone fa-clock-rotate-left" style={{ marginRight: '5px', '--fa-primary-color': '#ffffff', '--fa-secondary-color': '#ffffff' }}></i>
                                Duración: {formatDuracion(pelicula.duracion)}
                            </Typography>
                        } actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            >
                                <i class="fa-duotone fa-film fa-xl" style={{ '--fa-primary-color': '#ffffff', '--fa-secondary-color': '#ffffff' }}></i>
                            </IconButton>
                        }
                    />
                </ImageListItem>
            </CardActionArea>
        </Card>
    );
}

function formatDuracion(duracion) {
    const horas = Math.floor(duracion / 60);
    const minutos = duracion % 60;
    return `${horas}:${minutos.toString().padStart(2, '0')}hs`;
}