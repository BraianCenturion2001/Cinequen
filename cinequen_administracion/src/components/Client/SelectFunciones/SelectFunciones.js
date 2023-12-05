import React, { useEffect, useState } from "react";
import "./SelectFunciones.scss";
import {
  useEstablecimiento,
  usePeliculaEstablecimiento,
  usePelicula,
} from "../../../hooks";
import { Grid, Box, CircularProgress, Zoom, Typography } from "@mui/material";
import { CardPelicula } from "../../../components/Client";
import { Dropdown } from "semantic-ui-react";
import { map } from "lodash";

export function SelectFunciones() {
  const [checkedPeliculas, setCheckedPeliculas] = useState(false);
  const [delay, setDelay] = useState(0);
  const [establecimientosFormato, setEstablecimientosFormato] = useState([]);
  const [peliculasOptions, setPeliculasOptions] = useState([]);

  const { establecimientos, getEstablecimientos } = useEstablecimiento();
  const { loading: loadingPeliculas, peliculas, getPeliculas } = usePelicula();
  const {
    loading: loadingPE,
    peliculasEstablecimientos,
    getPeliculasEstablecimiento,
  } = usePeliculaEstablecimiento();

  useEffect(() => {
    getEstablecimientos();
    getPeliculas();
  }, []);

  useEffect(() => {
    setEstablecimientosFormato(formatDropdownData(establecimientos));
  }, [establecimientos]);

  useEffect(() => {
    if (!loadingPeliculas) {
      setPeliculasOptions(peliculas);
      setTimeout(() => {
        setCheckedPeliculas(true);
      }, 1000);
    }
  }, [loadingPeliculas, peliculas]);

  useEffect(() => {
    if (!loadingPE) {
      const peliculasData = peliculasEstablecimientos.map(
        (item) => item.pelicula_data
      );
      setPeliculasOptions(peliculasData);
    }
  }, [loadingPE, peliculasEstablecimientos]);

  const handleEstablecimientoChange = async (event, data) => {
    setPeliculasOptions([]);
    try {
      await getPeliculasEstablecimiento({ establecimiento: data.value });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "500px",
      }}
    >
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
          sx={{ marginRight: "15px", paddingTop: "8px" }}
        >
          Filtra por Establecimiento:
        </Typography>
        <Dropdown
          placeholder="Seleccione un Establecimiento"
          selection
          search
          options={establecimientosFormato}
          onChange={handleEstablecimientoChange}
          style={{ zIndex: 11 }}
        />
      </Box>
      {loadingPeliculas ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box sx={{ margin: "0 40px" }}>
          <Grid container spacing={12}>
            {peliculasOptions.map((pelicula, index) => (
              <Zoom
                in={checkedPeliculas}
                style={{ transitionDelay: `${delay + index * 300}ms` }}
              >
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={pelicula.id}>
                  <CardPelicula pelicula={pelicula} />
                </Grid>
              </Zoom>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.nombre,
    value: item.id,
  }));
}
