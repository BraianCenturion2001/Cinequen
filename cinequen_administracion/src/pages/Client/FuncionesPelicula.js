import React from 'react';
import { useParams } from 'react-router-dom';

export function FuncionesPelicula() {
    const { id } = useParams();

    // Utiliza el valor de "id" en tu lógica

    return (
        <div>
            <h1>Funciones de la Película {id}</h1>
            {/* Resto del contenido */}
        </div>
    );
}