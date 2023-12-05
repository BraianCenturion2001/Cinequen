import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Verificacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { validateUser, loading } = useUser();
  const [retener, setRetener] = useState(true);

  useEffect(() => {
    validateUser(id);
    document.title = "Verificarme";
  }, []);

  useEffect(() => {
    setInterval(() => {
      setRetener(false);
    }, 3000);
  }, [loading]);

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "50%",
        margin: "0 auto",
        marginTop: "25px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 1,
        height: "400px",
      }}
    >
      {retener ? (
        <Loader active size="big" inline="centered">
          Verificando usuario...
        </Loader>
      ) : (
        <>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            Verificación completada
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="success"
            onClick={navigateToLogin}
          >
            Ir a Iniciar Sesión
          </Button>
        </>
      )}
    </Box>
  );
}
