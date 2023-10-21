import React, { useState } from 'react';
import "./CardPelicula.scss";
import { styled } from '@mui/material/styles';
import { Icon } from 'semantic-ui-react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, Collapse, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const useExpandMore = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return { expanded, handleExpandClick };
};

export function CardPelicula(props) {
    const { pelicula } = props;
    const { expanded, handleExpandClick } = useExpandMore();

    const ExpandMore = styled(IconButton)(({ theme }) => ({
        transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    return (
        <Card elevation={3}>
            <CardActionArea>
                <CardHeader
                    title={pelicula.nombre}
                    subheader={`Duración: ${formatDuracion(pelicula.duracion)}`}
                    avatar={
                        <Icon name='film' size='big' />
                    }
                />
                <CardMedia component="img" height="194" image={pelicula.poster} alt={pelicula.nombre} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {pelicula.descripcion_corta
                            .split(' ')
                            .slice(0, 20) // Cambia el número por el límite deseado de palabras
                            .join(' ')}
                        {pelicula.descripcion_corta.split(' ').length > 10 ? '...' : ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <ExpandMore
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Icon name='angle down' />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{pelicula.descripcion_larga}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

function formatDuracion(duracion) {
    const horas = Math.floor(duracion / 60);
    const minutos = duracion % 60;
    return `${horas}:${minutos.toString().padStart(2, '0')}hs`;
}