import React from 'react';
import { Box, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Button, Typography } from '@mui/material';
import { map } from 'lodash';

export function TemplateCenturion(props) {
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
                                margin: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <i className="fa-duotone fa-loveseat fa-lg fa-rotate-180"></i>
                        </Box>
                    </Button>
                </TableCell>
            </>
        )
    }

    /* function renderFilas() {
        const filas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
        const filasInvertidas = filas.reverse();
        return (
            <>
                {filasInvertidas.map((fila) => (
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            {fila}
                        </TableCell>
                    </TableRow>
                ))}
            </>
        );
    } */

    return (
        <>
            <TableContainer>
                {cantidadEntradas} - {butacasIds}
                <Table sx={{ marginBottom: '50px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={32} sx={{ textAlign: 'center' }}>
                                <Typography variant="h3">
                                    PANTALLA
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <div style={{ width: '95%', margin: 'auto' }}>
                <TableContainer>
                    <Table sx={{ borderSpacing: '0px', '& td': { padding: '5px' } }}>
                        <TableBody>
                            {map(butacasPorFila, (butacas, fila) => (
                                <TableRow key={fila}>
                                    <TableCell
                                        sx={{
                                            position: 'sticky',
                                            left: 0,
                                            background: 'white',
                                            zIndex: 1,
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            padding: '5px',
                                        }}
                                    >
                                        {fila}
                                    </TableCell>
                                    {map(butacas, (butaca) => {
                                        var celdasAntes = false;
                                        var celdasDespués = false;
                                        var cantidadCeldasVacias = 0;
                                        // Verificar si es la fila y número específico
                                        if (fila === 'A' && butaca.butaca_data.numero === 11) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 10;
                                        }
                                        if (fila === 'B' && butaca.butaca_data.numero === 13) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 6;
                                        }

                                        if (['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L'].includes(fila) && (butaca.butaca_data.numero === 2 || butaca.butaca_data.numero === 22)) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 4;
                                        }

                                        if (fila === 'M' && butaca.butaca_data.numero === 4) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 24;
                                        }
                                        if (fila === 'N' && butaca.butaca_data.numero === 6) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 20;
                                        }

                                        if (['O', 'P', 'Q'].includes(fila) && (butaca.butaca_data.numero === 6 || butaca.butaca_data.numero === 24)) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 1;
                                        }

                                        if (fila === 'R' && (butaca.butaca_data.numero === 5 || butaca.butaca_data.numero === 15)) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 6;
                                        }

                                        if (fila === 'S' && butaca.butaca_data.numero === 1) {
                                            celdasAntes = true;
                                            cantidadCeldasVacias = 13;
                                        }

                                        if (fila === 'S' && butaca.butaca_data.numero === 6) {
                                            celdasDespués = true;
                                            cantidadCeldasVacias = 13;
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
                </TableContainer>
            </div>
        </>
    );
}