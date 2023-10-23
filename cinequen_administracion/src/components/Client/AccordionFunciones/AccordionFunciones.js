import React, { useState } from 'react';
import "./AccordionFunciones.scss";
import { BASE_REACT } from "../../../utils/constants";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import { Icon } from 'semantic-ui-react';
import { map, groupBy } from 'lodash';

export function AccordionFunciones(props) {
    const { gruposFunciones, expanded, handleChange } = props;

    function renderFunciones(funciones) {
        return (
            <>
                {map(funciones, (funcion) => (
                    <Button
                        key={funcion.id}
                        variant="outlined"
                        sx={{ marginRight: '10px' }}
                        href={`${BASE_REACT}/funcion/compra/${funcion.id}`}
                    >
                        {funcion.hora_inicio.substring(0, 5)}
                    </Button>
                ))}
            </>
        );
    }

    return (
        <>
            {map(gruposFunciones, (grupo) => {
                const salasPorEstablecimiento = groupBy(grupo.funciones, 'sala_data.id');
                return (
                    <Accordion
                        sx={{ marginBottom: '20px' }}
                        key={grupo.establecimiento.id}
                        expanded={expanded === grupo.establecimiento.id}
                        onChange={handleChange(grupo.establecimiento.id)}
                    >
                        <AccordionSummary
                            expandIcon={<Icon name="angle down" />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {grupo.establecimiento.nombre}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>
                                {grupo.establecimiento.direccion}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {map(salasPorEstablecimiento, (funciones, salaId) => {
                                const sala = funciones[0].sala_data;
                                return (
                                    <Box key={salaId} sx={{ marginBottom: '20px' }}>
                                        <Typography variant="h6" sx={{ marginBottom: '10px' }}>{sala.tipo}</Typography>
                                        {renderFunciones(funciones)}
                                    </Box>
                                );
                            })}
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    );
}