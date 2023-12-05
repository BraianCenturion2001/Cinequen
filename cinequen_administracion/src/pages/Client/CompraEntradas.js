import React, { useEffect, useState } from "react";
import { FormCompraEntradas } from "../../components/Client";
import { useParams } from "react-router-dom";
import { useFuncion } from "../../hooks";
import { Box } from "@mui/material";
import { Loader } from "semantic-ui-react";

export function CompraEntradas() {
  const { id } = useParams();
  const [funcion, setFuncion] = useState(null);
  const { loading, funciones, getFuncion } = useFuncion();

  useEffect(() => {
    getFuncion(id);
    document.title = "Comprar Entradas";
  }, []);

  useEffect(() => {
    if (!loading) {
      setFuncion(funciones);
    }
  }, [loading, funciones]);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = loading || !showForm;

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <Loader active inverted size="big" inline="centered">
            Cargando formulario
          </Loader>
        </Box>
      ) : (
        <FormCompraEntradas funcion={funcion} />
      )}
    </>
  );
}
