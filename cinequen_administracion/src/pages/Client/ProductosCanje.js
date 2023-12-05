import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Zoom,
  Box,
} from "@mui/material";
import { Loader, Image } from "semantic-ui-react";
import { useProductoCanje, useAuth, useCanjes } from "../../hooks";
import { map } from "lodash";
import { toast } from "react-toastify";

export function ProductosCanje() {
  const {
    loading: loadingProductos,
    productos,
    getProductosCanje,
  } = useProductoCanje();
  const { loading: loadingCanje, addCanje } = useCanjes();
  const [resultado, setResultado] = useState(null);
  const [restaPuntos, setRestaPuntos] = useState(0);
  const [checkedProductos, setCheckedProductos] = useState(false);
  const [delay, setDelay] = useState(0);
  const [misPuntos, setMisPuntos] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    getProductosCanje();
    setMisPuntos(auth?.me?.puntos);
    document.title = "Ver Productos de Canje";
  }, []);

  const canjearProducto = async (idProducto, precioPuntos) => {
    if (auth?.me !== undefined) {
      if (auth.me.puntos < precioPuntos) {
        toast.error("Puntos insuficientes!");
      } else {
        const canjeData = {
          producto: idProducto,
          puntos_restados: precioPuntos,
          cliente: auth.me.user_id,
        };

        var resultado_canje = await addCanje(canjeData);
        setResultado(resultado_canje);
        setRestaPuntos(precioPuntos);
      }
    } else {
      toast.error("Para canjear productos debes iniciar sesión!");
    }
  };

  useEffect(() => {
    if (!loadingCanje) {
      if (resultado !== 201) {
        toast.error("Puntos insuficientes!");
      } else {
        setMisPuntos(misPuntos - restaPuntos);
        toast.success("Canje realizado con éxito!");
      }
    }
  }, [loadingCanje, resultado]);

  useEffect(() => {
    if (!loadingProductos) {
      setTimeout(() => {
        setCheckedProductos(true);
      }, 1000);
    }
  }, [loadingProductos]);

  const renderCards = () => {
    return map(productos, (producto, index) => (
      <Zoom
        in={checkedProductos}
        style={{ transitionDelay: `${delay + index * 300}ms` }}
      >
        <Card
          key={index}
          sx={{
            width: 200,
            marginBottom: 5,
            marginLeft: 5,
            marginRight: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            width={200}
            height={150}
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {producto.nombre}
            </Typography>
            <Typography variant="h6">
              <i
                className="fa-duotone fa-ticket"
                style={{
                  marginRight: "8px",
                  "--fa-primary-color": "#0f0f0f",
                  "--fa-secondary-color": "#e31616",
                  "--fa-secondary-opacity": 0.8,
                }}
              ></i>
              {producto.precio_puntos}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {producto.descripcion}
            </Typography>
          </CardContent>
          <CardActions sx={{ marginTop: "auto" }}>
            <Button
              onClick={() =>
                canjearProducto(producto.id, producto.precio_puntos)
              }
              type="submit"
              variant="outlined"
              color="error"
              fullWidth
            >
              Canjear Producto
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    ));
  };
  return (
    <>
      {loadingProductos ? (
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
            Cargando producos de canje
          </Loader>
        </Box>
      ) : (
        <>
          {auth ? (
            <Box
              sx={{
                width: "95%",
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
                variant="h5"
                gutterBottom
                sx={{
                  marginRight: "15px",
                  paddingTop: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Mis Puntos:{" "}
                <Box
                  sx={{
                    marginLeft: "8px",
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
                  {misPuntos}
                </Box>
              </Typography>
            </Box>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            {renderCards()}
          </div>
        </>
      )}
    </>
  );
}
