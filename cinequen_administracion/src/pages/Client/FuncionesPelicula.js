import React, { useState, useEffect } from 'react';
import { useFuncion } from "../../hooks";
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { Button, Box } from '@mui/material';
import { AccordionFunciones } from "../../components/Client"
import { map, uniqBy } from 'lodash';

export function FuncionesPelicula() {
    const { id } = useParams();
    const { loading, funciones, getFuncionesPelicula } = useFuncion();
    const [expanded, setExpanded] = useState(false);
    const [nombrePelicula, setNombrePelicula] = useState('');
    const [selectedFecha, setSelectedFecha] = useState('');
    const [gruposFunciones, setGruposFunciones] = useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        getFuncionesPelicula(id);
    }, []);

    useEffect(() => {
        if (!loading) {
            setNombrePelicula(funciones[0].pelicula_data.nombre);
            const gruposOrdenados = ordenarFuncionesPorFechaYEstablecimiento(funciones);
            setGruposFunciones(gruposOrdenados);

            // Seleccionar la primera fecha y mostrar el acordeón correspondiente
            const primeraFecha = uniqBy(funciones, 'fecha')[0].fecha;
            setSelectedFecha(primeraFecha);
        }
    }, [loading, funciones]);

    const ordenarFuncionesPorFechaYEstablecimiento = (funciones) => {
        const gruposPorFecha = map(uniqBy(funciones, 'fecha'), (funcion) => ({
            fecha: funcion.fecha,
            grupos: [],
        }));

        funciones.forEach((funcion) => {
            const grupoFecha = gruposPorFecha.find((grupo) => grupo.fecha === funcion.fecha);
            const establecimiento = funcion.sala_data.establecimiento_data;

            let grupoEstablecimiento = grupoFecha.grupos.find(
                (grupo) => grupo.establecimiento.id === establecimiento.id
            );

            if (!grupoEstablecimiento) {
                grupoEstablecimiento = {
                    establecimiento: establecimiento,
                    funciones: [],
                };
                grupoFecha.grupos.push(grupoEstablecimiento);
            }

            grupoEstablecimiento.funciones.push(funcion);
        });

        gruposPorFecha.forEach((grupoFecha) => {
            grupoFecha.grupos.sort((a, b) => {
                const nombreEstablecimientoA = a.establecimiento.nombre.toLowerCase();
                const nombreEstablecimientoB = b.establecimiento.nombre.toLowerCase();
                return nombreEstablecimientoA.localeCompare(nombreEstablecimientoB);
            });
        });

        return gruposPorFecha;
    };

    const handleFechaClick = (fecha) => {
        setSelectedFecha(fecha);
    };

    const fechasDisponibles = uniqBy(funciones, 'fecha')
        .map((funcion) => funcion.fecha)
        .sort((a, b) => new Date(a) - new Date(b));

    return (
        <>
            <h1>Funciones para {nombrePelicula}</h1>
            <Box sx={{ margin: '30px' }}>
                {fechasDisponibles.map((fecha) => (
                    <Button
                        key={fecha}
                        size="large"
                        onClick={() => handleFechaClick(fecha)}
                        variant={fecha === selectedFecha ? 'contained' : 'outlined'}
                        sx={{
                            margin: '1rem',
                            alignItems: 'center',
                        }}
                    >
                        <Icon name='calendar alternate outline' size='big' /> {fecha}
                    </Button>
                ))}
            </Box>
            <Box sx={{ width: '500px', margin: '30px' }}>
                {selectedFecha && (
                    <AccordionFunciones
                        handleChange={handleChange}
                        expanded={expanded}
                        gruposFunciones={gruposFunciones.find((grupo) => grupo.fecha === selectedFecha).grupos}
                    />
                )}
            </Box>
        </>
    );
}