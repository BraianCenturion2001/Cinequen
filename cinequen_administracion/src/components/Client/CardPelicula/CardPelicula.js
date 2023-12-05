import React from 'react';
import "./CardPelicula.scss";
import { Label } from "semantic-ui-react"
import { useNavigate } from "react-router-dom";

export function CardPelicula(props) {
    const { pelicula } = props;
    const navigate = useNavigate();

    const renderLabel = (tipoPelicula) => {
        let color = "";
        switch (tipoPelicula) {
            case 'Pre-Venta':
                color = 'orange';
                break;
            case 'Estreno':
                color = 'teal';
                break;
            case 'Ultimas Semanas':
                color = 'red';
                break;
        }

        return (
            <Label color={color} ribbon style={{ marginLeft: "19.5px", bottom: "-20px", zIndex: 10 }}>
                {tipoPelicula}
            </Label>
        );
    };

    const MovieInfo = ({ name, value }) => (
        <div className={`movie__${name}`}>
            <span className='info__head'>
                {name}
            </span>
            {value}
        </div>
    )

    const handleClick = () => {
        navigate(`/funciones/pelicula/${pelicula.id}`);
    };


    return (
        <>
            {renderLabel(pelicula.tipo)}
            <div className='movie' style={{
                backgroundImage: `url(${pelicula.poster})`
                , backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

                <h2 className='movie__title'>{pelicula.nombre}</h2>

                <div className='movie__infos'>
                    <MovieInfo name='Duración' value={pelicula.duracion} />
                    <MovieInfo name='Director' value={pelicula.director} />
                    <MovieInfo name='Cast' value={pelicula.actores} />
                    <MovieInfo name='Clasificacion' value={pelicula.clasificacion} />
                </div>

                <div className='movie__imdb'>
                    <a onClick={handleClick} className='movie__imdb-button'> <i
                        className="fa-duotone fa-film"
                        style={{ marginRight: "5px" }}
                    ></i>Ver Funciones</a>
                </div>
            </div>
        </>
    );
}