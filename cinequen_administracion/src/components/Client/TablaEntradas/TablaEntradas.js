import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { map, partition } from 'lodash';

export function TablaEntradas(props) {
    const { entradas } = props;

    // Obtener la fecha de hoy
    const today = new Date();

    // Dividir las entradas en dos arreglos basado en la fecha de la función
    const [entradasFuturas, entradasPasadas] = partition(entradas, (entrada) => {
        const fechaFuncion = new Date(entrada.funcion_data.fecha);
        return fechaFuncion >= today;
    });

    // Función para obtener los nombres de las butacas
    const obtenerButacasNombres = (butacasData) => {
        return butacasData.map((butaca) => `${butaca.butaca_data.fila}-${butaca.butaca_data.numero}`).join(", ");
    };

    // Agregar el atributo butacas_nombres a cada item de entradasFuturas
    const entradasFuturasConButacasNombres = entradasFuturas.map((entrada) => ({
        ...entrada,
        butacas_nombres: obtenerButacasNombres(entrada.butacas_data),
    }));

    // Agregar el atributo butacas_nombres a cada item de entradasPasadas
    const entradasPasadasConButacasNombres = entradasPasadas.map((entrada) => ({
        ...entrada,
        butacas_nombres: obtenerButacasNombres(entrada.butacas_data),
    }));

    // Función para renderizar las filas de la tabla
    const renderFilasTabla = (entradas, esHistorial = false) => {
        return map(entradas, (entrada) => (
            <TableRow key={entrada.id}>
                <TableCell>{entrada.funcion_data.fecha}</TableCell>
                <TableCell>{entrada.funcion_data.sala_data.establecimiento_data.nombre} - {entrada.funcion_data.sala_data.nombre}</TableCell>
                <TableCell>{entrada.funcion_data.pelicula_data.nombre}</TableCell>
                <TableCell>{obtenerButacasNombres(entrada.butacas_data)}</TableCell>
                <TableCell align="right">
                    {entrada.estado ? (
                        <Button variant="outlined" color="success" style={{ marginRight: "5px" }}>
                            <i className="fa-duotone fa-check fa-lg" style={{ "marginRight": "10px", "--fa-primary-color": "#416b1f", "--fa-secondary-color": "#416b1f" }}></i>
                            Escaneada
                        </Button>
                    ) : (
                        <Button variant="outlined" color="error" style={{ marginRight: "5px" }}>
                            <i className="fa-duotone fa-xmark fa-lg" style={{ "marginRight": "10px", "--fa-primary-color": "#e61919", "--fa-secondary-color": "#c11515", "--fa-secondary-opacity": "1" }}></i>
                            Sin Escanear
                        </Button>
                    )}
                    {esHistorial && <Button variant="outlined" color="info"><i class="fa-duotone fa-qrcode fa-xl" style={{ "marginTop": "10px", "marginBottom": "10px" }}></i></Button>}
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} style={{ width: '90%', margin: '0 auto', marginTop: '20px', marginBottom: '20px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            Entradas Activas
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Establecimiento</TableCell>
                        <TableCell>Pelicula</TableCell>
                        <TableCell>Butacas</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entradasFuturas.length > 0 ? (
                        renderFilasTabla(entradasFuturas, true)
                    ) : (
                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                Sin entradas registradas.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            Historial de Entradas
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Establecimiento</TableCell>
                        <TableCell>Pelicula</TableCell>
                        <TableCell>Butacas</TableCell>
                        <TableCell align="right">-</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {entradasPasadas.length > 0 ? (
                        renderFilasTabla(entradasPasadas)
                    ) : (
                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                Sin entradas registradas.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
