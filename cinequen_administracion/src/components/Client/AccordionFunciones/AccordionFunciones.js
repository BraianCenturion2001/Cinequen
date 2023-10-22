import React, { useState } from 'react'
import "./AccordionFunciones.scss"
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material'
import { Icon } from 'semantic-ui-react'
import { map } from 'lodash'

export function AccordionFunciones(props) {
    const { gruposFunciones, expanded, handleChange } = props

    return (
        <>
            {map(gruposFunciones, (grupo) => (
                <Accordion
                    sx={{ marginBottom: '20px' }}
                    key={grupo.establecimiento.id}
                    expanded={expanded === grupo.establecimiento.id}
                    onChange={handleChange(grupo.establecimiento.id)}
                >
                    <AccordionSummary
                        expandIcon={<Icon name='angle down' />}
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
                        {map(grupo.funciones, (funcion) => (
                            <Button
                                key={funcion.id}
                                variant="outlined"
                                sx={{ marginRight: '10px' }}
                                href={`funcion/compra/${funcion.id}`}
                            >
                                {funcion.hora_inicio.substring(0, 5)}
                            </Button>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
}
