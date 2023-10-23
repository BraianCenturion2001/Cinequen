import React from 'react';
import { Box, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Button, Typography } from '@mui/material';
import { map } from 'lodash';

export function TemplateMidway(props) {
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

    function renderCeldaButaca(butaca) {
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
            </>
        )
    }

    return (
        <TableContainer>
            {cantidadEntradas} - {butacasIds}
            <Table sx={{ marginBottom: '50px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={15} sx={{ textAlign: 'center' }}>
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
                                var celdasAntes = false;
                                var celdasDespués = false;
                                var cantidadCeldasVacias = 0;
                                // Verificar si es la fila y número específico
                                if (fila === 'A') {
                                    if (butaca.butaca_data.numero === 1) {
                                        celdasAntes = true;
                                        cantidadCeldasVacias = 3;
                                    }
                                    if (butaca.butaca_data.numero === 2) {
                                        celdasDespués = true;
                                        cantidadCeldasVacias = 5;
                                    }
                                    if (butaca.butaca_data.numero === 4) {
                                        celdasDespués = true;
                                        cantidadCeldasVacias = 3;
                                    }
                                }

                                if (['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L'].includes(fila) && (butaca.butaca_data.numero === 2 || butaca.butaca_data.numero === 11)) {
                                    celdasDespués = true;
                                    cantidadCeldasVacias = 1;
                                }

                                if (fila === 'K' && butaca.butaca_data.numero === 2) {
                                    celdasDespués = true;
                                    cantidadCeldasVacias = 11;
                                }

                                if (fila === 'M' && (butaca.butaca_data.numero === 2 || butaca.butaca_data.numero === 9)) {
                                    celdasDespués = true;
                                    cantidadCeldasVacias = 2;
                                }

                                if (fila === 'N' && (butaca.butaca_data.numero === 1 || butaca.butaca_data.numero === 6)) {
                                    celdasDespués = true;
                                    cantidadCeldasVacias = 4;
                                }

                                if (celdasDespués) {
                                    return (
                                        <>
                                            {renderCeldaButaca(butaca)}
                                            {renderCeldasVacias(cantidadCeldasVacias)}
                                        </>
                                    );
                                } else if (celdasAntes) {
                                    return (
                                        <>
                                            {renderCeldasVacias(cantidadCeldasVacias)}
                                            {renderCeldaButaca(butaca)}
                                        </>
                                    );
                                } else {
                                    return (
                                        <>
                                            {renderCeldaButaca(butaca)}
                                        </>
                                    );
                                }
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}