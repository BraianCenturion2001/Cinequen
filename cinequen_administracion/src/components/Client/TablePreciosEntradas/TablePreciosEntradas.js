import React from 'react'
import { TextField, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from "@mui/material"

export function TablePreciosEntradas(props) {
    const { cantidadEntradas, setCantidadEntradas, precioEntradas, setPrecioEntradas, precioBase } = props;

    const handleEntradasChange = (event) => {
        const cantidad = event.target.value;
        setCantidadEntradas(cantidad);
        setPrecioEntradas(cantidad * precioBase);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tickets</TableCell>
                        <TableCell align="right">Costo</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row">
                            Entrada General
                        </TableCell>
                        <TableCell align="right">$ {precioBase}</TableCell>
                        <TableCell align="right">
                            <TextField
                                id="outlined-number"
                                label="Cantidad de Entradas"
                                type="number"
                                value={cantidadEntradas}
                                onChange={handleEntradasChange}
                                inputProps={{ min: 0 }}
                            />
                        </TableCell>
                        <TableCell align="right">$ {precioEntradas}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
