import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { map } from "lodash";
import { Image } from "semantic-ui-react";
import dayjs from "dayjs";
import { useAuth } from "../../../hooks"

export function TablaCanjes(props) {
  const { canjes } = props;
  const { auth } = useAuth();

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
          <Typography variant="h6">
            <Box
              sx={{
                marginLeft: '8px',
                backgroundColor: "yellow",
                borderRadius: "15px",
                width: "100px",
                padding: "7px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="fa-duotone fa-ticket"
                style={{
                  marginRight: "8px",
                  "--fa-primary-color": "#0f0f0f",
                  "--fa-secondary-color": "#e31616",
                  "--fa-secondary-opacity": 0.8,
                }}
              ></i>
              - {canje.puntos_restados}
            </Box></Typography>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 1,
          mt: "20px",
          mb: "20px",
          padding: "15px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginRight: "15px",
            paddingTop: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Mis puntos actualmente:{" "}
          <Box
            sx={{
              marginLeft: '8px',
              backgroundColor: "yellow",
              borderRadius: "15px",
              width: "100px",
              padding: "7px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              className="fa-duotone fa-ticket"
              style={{
                marginRight: "8px",
                "--fa-primary-color": "#0f0f0f",
                "--fa-secondary-color": "#e31616",
                "--fa-secondary-opacity": 0.8,
              }}
            ></i>
            {auth.me.puntos}
          </Box>
        </Typography>
      </Box>
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
                <Typography variant="h3">Historial de Canjes</Typography>
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
    </>
  );
}
