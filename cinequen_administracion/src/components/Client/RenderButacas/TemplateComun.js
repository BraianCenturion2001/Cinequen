import React from 'react';
import { Box, Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Button, Typography } from '@mui/material';
import { map } from 'lodash';

export function TemplateComun(props) {
    const { butacasPorFila, cantidadEntradas, butacasIds, setButacasIds } = props;

    function renderCeldasVacias(cantidad) {
        return (
            <>
                {Array.from({ length: cantidad }).map((_, index) => (
                    <TableCell key={`empty-${index}`} sx={{ border: 'none' }} />
                ))}
            </>
        );
    }

    function agregarButacaSeleccionada(id) {
        if (butacasIds.length < cantidadEntradas) {
            setButacasIds([...butacasIds, id]);
        } else {
            const nuevasButacasSeleccionadas = [...butacasIds];
            nuevasButacasSeleccionadas[0] = id;
            setButacasIds(nuevasButacasSeleccionadas);
        }
    }

    function quitarButacaSeleccionada(id) {
        const nuevasButacasSeleccionadas = butacasIds.filter((butacaId) => butacaId !== id);
        setButacasIds(nuevasButacasSeleccionadas);
    }

    function isButacaSeleccionada(id) {
        return butacasIds.includes(id);
    }

    function handleButacaClick(id) {
        if (isButacaSeleccionada(id)) {
            quitarButacaSeleccionada(id);
        } else {
            agregarButacaSeleccionada(id);
        }
    }

    return (
        <TableContainer>
            {cantidadEntradas} - {butacasIds}
            <Table sx={{ marginBottom: '50px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={10} sx={{ textAlign: 'center' }}>
                            <Typography variant="h3">
                                PANTALLA
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Table sx={{ borderSpacing: '0px', '& td': { padding: '5px' } }}>
                <TableBody>
                    {map(butacasPorFila, (butacas, fila) => (
                        <TableRow key={fila}>
                            {map(butacas, (butaca) => {
                                var celdasVacias = false;
                                var cantidadCeldasVacias = 0;
                                // Verificar si es la fila y número específico
                                if (
                                    (fila === 'I' && (butaca.butaca_data.numero === 2 || butaca.butaca_data.numero === 6)) ||
                                    (fila === 'J' && (butaca.butaca_data.numero === 2 || butaca.butaca_data.numero === 6))
                                ) {
                                    celdasVacias = true;
                                    cantidadCeldasVacias = 2;
                                }
                                if (fila === 'H' && butaca.butaca_data.numero === 2) {
                                    celdasVacias = true;
                                    cantidadCeldasVacias = 7;
                                }
                                if (celdasVacias) {
                                    return (
                                        <>
                                            <TableCell key={butaca.id} sx={{ border: 'none' }}>
                                                <Button
                                                    variant={butaca.estado ? 'contained' : (isButacaSeleccionada(butaca.id) ? 'contained' : 'outlined')}
                                                    color={isButacaSeleccionada(butaca.id) ? 'success' : 'primary'}
                                                    sx={{
                                                        alignItems: 'center',
                                                    }}
                                                    disabled={butaca.estado}
                                                    onClick={() => handleButacaClick(butaca.id)}
                                                >
                                                    <Box
                                                        key={butaca.id}
                                                        sx={{
                                                            marginTop: '15px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <i className="fa-duotone fa-loveseat fa-xl fa-rotate-180"></i>
                                                        <Box sx={{ marginTop: '5px' }}>{`${butaca.butaca_data.fila}-${butaca.butaca_data.numero}`}</Box>
                                                    </Box>
                                                </Button>
                                            </TableCell>
                                            {renderCeldasVacias(cantidadCeldasVacias - 1)}
                                        </>
                                    );
                                } else {
                                    return (
                                        <TableCell key={butaca.id} sx={{ border: 'none' }}>
                                            <Button
                                                variant={butaca.estado ? 'contained' : (isButacaSeleccionada(butaca.id) ? 'contained' : 'outlined')}
                                                color={isButacaSeleccionada(butaca.id) ? 'success' : 'primary'}
                                                sx={{
                                                    alignItems: 'center',
                                                }}
                                                disabled={butaca.estado}
                                                onClick={() => handleButacaClick(butaca.id)}
                                            >
                                                <Box
                                                    key={butaca.id}
                                                    sx={{
                                                        marginTop: '15px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <i className="fa-duotone fa-loveseat fa-xl fa-rotate-180"></i>
                                                    <Box sx={{ marginTop: '5px' }}>{`${butaca.butaca_data.fila}-${butaca.butaca_data.numero}`}</Box>
                                                </Box>
                                            </Button>
                                        </TableCell>
                                    );
                                }
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}