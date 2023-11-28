import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { map, partition } from "lodash";
import { ModalBasic } from "../../Common";
import { BASE_API, BASE_REACT } from "../../../utils/constants";
import { useEntrada } from "../../../hooks";

export function TablaEntradas(props) {
  const { entradas } = props;
  const { generarPDF } = useEntrada();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const handleGenerarPDF = async () => {
    try {
      setTimeout(async () => {
        await generarPDF();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showModal) {
      handleGenerarPDF();
    }
  }, [showModal]);

  const modalQR = (qrValue) => {
    setTitleModal("Descargar QR");
    setContentModal(
      <QRCode
        value={qrValue}
        enableCORS={true}
        logoImage={BASE_REACT + "/images/Icon 1.png"}
        removeQrCodeBehindLogo={true}
        size={250}
        eyeColor="#cc1212"
        fgColor="#cc1212"
        qrStyle="dots"
        eyeRadius={[
          [10, 10, 0, 10],
          [10, 10, 10, 0], // top/right eye
          [10, 0, 10, 10], // bottom/left
        ]}
        id={"QRCodePDF"}
      />
    );
    openCloseModal();
  };

  // Obtener la fecha de hoy
  const today = new Date();

  // Dividir las entradas en dos arreglos basado en la fecha de la función
  const [entradasFuturas, entradasPasadas] = partition(entradas, (entrada) => {
    const fechaFuncion = new Date(entrada.funcion_data.fecha);
    return fechaFuncion >= today;
  });

  // Función para obtener los nombres de las butacas
  const obtenerButacasNombres = (butacasData) => {
    return butacasData
      .map(
        (butaca) => `${butaca.butaca_data.fila}-${butaca.butaca_data.numero}`
      )
      .join(", ");
  };

  // Función para renderizar las filas de la tabla
  const renderFilasTabla = (entradas, esHistorial = false) => {
    return map(entradas, (entrada) => (
      <TableRow key={entrada.id}>
        <TableCell>{entrada.funcion_data.fecha}</TableCell>
        <TableCell>
          {entrada.funcion_data.sala_data.establecimiento_data.nombre} -{" "}
          {entrada.funcion_data.sala_data.nombre}
        </TableCell>
        <TableCell>{entrada.funcion_data.pelicula_data.nombre}</TableCell>
        <TableCell>{obtenerButacasNombres(entrada.butacas_data)}</TableCell>
        <TableCell align="right">
          {entrada.estado ? (
            <Button
              variant="outlined"
              color="success"
              style={{ marginRight: "5px" }}
            >
              <i
                className="fa-duotone fa-check fa-lg"
                style={{
                  marginRight: "10px",
                  "--fa-primary-color": "#416b1f",
                  "--fa-secondary-color": "#416b1f",
                }}
              ></i>
              Escaneada
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="error"
              style={{ marginRight: "5px" }}
            >
              <i
                className="fa-duotone fa-xmark fa-lg"
                style={{
                  marginRight: "10px",
                  "--fa-primary-color": "#e61919",
                  "--fa-secondary-color": "#c11515",
                  "--fa-secondary-opacity": "1",
                }}
              ></i>
              Sin Escanear
            </Button>
          )}
          {esHistorial && (
            <Button
              variant="outlined"
              color="info"
              onClick={() => modalQR(`${BASE_API}/api/entradas/${entrada.id}`)}
            >
              <i
                class="fa-duotone fa-qrcode fa-xl"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              ></i>
            </Button>
          )}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
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
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
