import React from 'react';
import { Box, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Button, Typography } from '@mui/material';
import { map } from 'lodash';

export function Template4Buster(props) {
    const { butacasPorFila, cantidadEntradas, butacasIds, setButacasIds } = props;

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
            <Table sx={{ marginBottom: '50px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={32} sx={{ textAlign: 'center', borderRadius: 1 }}>
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
                                return renderCeldaButaca(butaca)
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}