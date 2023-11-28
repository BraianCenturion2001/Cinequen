import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { map } from "lodash";
import { Image } from "semantic-ui-react";
import dayjs from "dayjs";

export function TablaCanjes(props) {
  const { canjes } = props;

  const formatearFecha = (fecha) => {
    const fechaFormateada = dayjs(fecha).format("MMM DD, YYYY");
    return fechaFormateada;
  };
  // Función para renderizar las filas de la tabla
  const renderFilasTabla = (canjes) => {
    const canjesOrdenados = canjes.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaB - fechaA;
    });
    return map(canjesOrdenados, (canje) => (
      <TableRow key={canje.id}>
        <TableCell>{formatearFecha(canje.fecha)}</TableCell>
        <TableCell>{canje.producto_data.nombre}</TableCell>
        <TableCell>
          <Image
            style={{ width: "80px" }}
            rounded="true"
            src={canje.producto_data.imagen}
          />
        </TableCell>
        <TableCell>
          <Typography variant="h6">- {canje.puntos_restados}</Typography>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        width: "90%",
        margin: "0 auto",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              <Typography variant="h2">Historial de Canjes</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fecha de Canje</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Imagen Producto</TableCell>
            <TableCell>Puntos Coste</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {canjes.length > 0 ? (
            renderFilasTabla(canjes)
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
  );
}
