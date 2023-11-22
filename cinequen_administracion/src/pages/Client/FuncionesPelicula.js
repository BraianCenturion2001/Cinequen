import React, { useState, useEffect } from 'react';
import { useFuncion } from "../../hooks";
import { useParams } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import { Button, Box, Typography } from '@mui/material';
import { AccordionFunciones } from "../../components/Client"
import { map, uniqBy } from 'lodash';
import dayjs from 'dayjs';

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
            if (funciones.length > 0) {
                //console.log(funciones)
                setNombrePelicula(funciones[0].pelicula_data.nombre);
                const gruposOrdenados = ordenarFuncionesPorFechaYEstablecimiento(funciones);
                setGruposFunciones(gruposOrdenados);

                // Seleccionar la primera fecha y mostrar el acordeón correspondiente
                const primeraFecha = uniqBy(funciones, 'fecha')[0].fecha;
                handleFechaClick(primeraFecha); // Seleccionar la primera fecha al cargar el componente
            }
        }
    }, [loading, funciones]);

    const ordenarFuncionesPorFechaYEstablecimiento = (funciones) => {
        const gruposPorFecha = map(uniqBy(funciones, 'fecha'), (funcion) => ({
            fecha: dayjs(funcion.fecha).format('MMM DD'),
            grupos: [],
        }));

        funciones.forEach((funcion) => {
            const grupoFecha = gruposPorFecha.find((grupo) => grupo.fecha === dayjs(funcion.fecha).format('MMM DD'));
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
        const fechaFormateada = dayjs(fecha).format('MMM DD');
        setSelectedFecha(fechaFormateada);
    };

    const fechasDisponibles = uniqBy(funciones, 'fecha')
        .map((funcion) => {
            const fechaFormateada = dayjs(funcion.fecha).format('MMM DD');
            return fechaFormateada;
        })
        .sort((a, b) => dayjs(a).toDate() - dayjs(b).toDate());

    return (
        <>
            <Box sx={{ width: '95%', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1, mt: '20px', mb: '200px', padding: '30px' }}>
                {loading ? (
                    <Loader active inline="centered">
                        Cargando
                    </Loader>
                ) : (
                    funciones.length > 0 ? (
                        <>
                            <Typography variant="h3" align="center">Funciones para {nombrePelicula}</Typography>
                            <Box>
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
                            <Box sx={{ width: '500px' }}>
                                {selectedFecha && (
                                    <AccordionFunciones
                                        handleChange={handleChange}
                                        expanded={expanded}
                                        gruposFunciones={gruposFunciones.find((grupo) => grupo.fecha === selectedFecha).grupos}
                                    />
                                )}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="h3" align="center">Sin funciones disponibles para esta semana.</Typography>
                    )
                )}
            </Box>
        </>
    );
}