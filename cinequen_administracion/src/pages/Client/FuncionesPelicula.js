import React, { useState, useEffect } from "react";
import { useFuncion } from "../../hooks";
import { useParams } from "react-router-dom";
import { Icon, Loader } from "semantic-ui-react";
import { Button, Box, Typography } from "@mui/material";
import { AccordionFunciones, FiltrosFunciones } from "../../components/Client";
import { map, uniqBy } from "lodash";
import dayjs from "dayjs";

export function FuncionesPelicula() {
  const { id } = useParams();
  const { loading, funciones, getFuncionesPelicula } = useFuncion();
  const [expanded, setExpanded] = useState(false);
  const [nombrePelicula, setNombrePelicula] = useState("");
  const [selectedFecha, setSelectedFecha] = useState("");
  const [gruposFunciones, setGruposFunciones] = useState([]);
  const [funcionesFiltrables, setfuncionesFiltrables] = useState([]);

  const [filtros, setFiltros] = useState({
    tipoSala: null,
    formato: null,
    idioma: null,
  });

  const aplicarFiltros = (filtro, valor) => {
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [filtro]: valor,
    }));
  };

  useEffect(() => {
    if (!loading) {
      if (funciones.length > 0) {
        const funcionesFiltradas = funciones.filter((funcion) => {
          const fechaFormateada = dayjs(funcion.fecha).format("MMM DD");
          return (
            fechaFormateada === selectedFecha &&
            (!filtros.tipoSala ||
              funcion.sala_data.tipo === filtros.tipoSala) &&
            (!filtros.formato || funcion.formato === filtros.formato) &&
            (!filtros.idioma || funcion.idioma === filtros.idioma)
          );
        });
        setfuncionesFiltrables(funcionesFiltradas);
        const gruposOrdenados =
          ordenarFuncionesPorFechaYEstablecimiento(funcionesFiltradas);
        setGruposFunciones(gruposOrdenados);
      }
    }
  }, [loading, funciones, filtros]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getFuncionesPelicula(id);
    document.title = "Ver Funciones";
  }, []);

  useEffect(() => {
    if (!loading) {
      if (funciones.length > 0) {
        //console.log(funciones)
        setNombrePelicula(funciones[0].pelicula_data.nombre);
        const gruposOrdenados =
          ordenarFuncionesPorFechaYEstablecimiento(funciones);
        setGruposFunciones(gruposOrdenados);

        // Seleccionar la primera fecha y mostrar el acordeón correspondiente
        const fechasOrdenadas = uniqBy(funciones, "fecha")
          .map((funcion) => dayjs(funcion.fecha).format("MMM DD"))
          .sort((a, b) => dayjs(a).toDate() - dayjs(b).toDate());
        const primeraFecha = fechasOrdenadas[0];
        handleFechaClick(primeraFecha); // Seleccionar la primera fecha al cargar el componente
        setfuncionesFiltrables(funciones);
      }
    }
  }, [loading, funciones]);

  const ordenarFuncionesPorFechaYEstablecimiento = (funciones) => {
    const gruposPorFecha = map(uniqBy(funciones, "fecha"), (funcion) => ({
      fecha: dayjs(funcion.fecha).format("MMM DD"),
      grupos: [],
    }));

    funciones.forEach((funcion) => {
      const grupoFecha = gruposPorFecha.find(
        (grupo) => grupo.fecha === dayjs(funcion.fecha).format("MMM DD")
      );
      const establecimiento = funcion.sala_data.establecimiento_data;
      const sala_tipo = funcion.sala_data.tipo;

      let grupoEstablecimiento = grupoFecha.grupos.find(
        (grupo) => grupo.establecimiento.id === establecimiento.id
      );

      if (!grupoEstablecimiento) {
        grupoEstablecimiento = {
          establecimiento: establecimiento,
          funcionesFormato: [],
        };
        grupoFecha.grupos.push(grupoEstablecimiento);
      }

      const formatoIdiomaSalaTipo = `${sala_tipo} ${funcion.formato} ${funcion.idioma}`;
      let grupoFormato = grupoEstablecimiento.funcionesFormato.find(
        (grupo) => grupo.formatoIdiomaSalaTipo === formatoIdiomaSalaTipo
      );

      if (!grupoFormato) {
        grupoFormato = {
          formatoIdiomaSalaTipo,
          formato: funcion.formato,
          idioma: funcion.idioma,
          salaTipo: sala_tipo,
          funciones: [],
        };
        grupoEstablecimiento.funcionesFormato.push(grupoFormato);
      }

      grupoFormato.funciones.push(funcion);
    });

    gruposPorFecha.forEach((grupoFecha) => {
      grupoFecha.grupos.sort((a, b) => {
        const nombreEstablecimientoA = a.establecimiento.nombre.toLowerCase();
        const nombreEstablecimientoB = b.establecimiento.nombre.toLowerCase();
        return nombreEstablecimientoA.localeCompare(nombreEstablecimientoB);
      });
    });

    return gruposPorFecha;
  };

  const handleFechaClick = (fecha) => {
    const fechaFormateada = dayjs(fecha).format("MMM DD");
    setSelectedFecha(fechaFormateada);

    // Filtrar funciones por la nueva fecha
    const funcionesFiltradas = funciones.filter((funcion) => {
      const fechaFuncion = dayjs(funcion.fecha).format("MMM DD");
      return fechaFuncion === fechaFormateada;
    });

    setfuncionesFiltrables(funcionesFiltradas);
  };

  const fechasDisponibles = uniqBy(funciones, "fecha")
    .map((funcion) => {
      const fechaFormateada = dayjs(funcion.fecha).format("MMM DD");
      return fechaFormateada;
    })
    .sort((a, b) => dayjs(a).toDate() - dayjs(b).toDate());

  return (
    <>
      <Box
        sx={{
          width: "95%",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 1,
          mt: "20px",
          mb: "200px",
          padding: "30px",
        }}
      >
        {loading ? (
          <Loader active inline="centered">
            Cargando
          </Loader>
        ) : funciones.length > 0 ? (
          <>
            <Typography variant="h3" align="center">
              Funciones para {nombrePelicula}
            </Typography>
            <FiltrosFunciones aplicarFiltros={aplicarFiltros} />
            <Box>
              {fechasDisponibles.map((fecha) => (
                <Button
                  key={fecha}
                  size="large"
                  onClick={() => handleFechaClick(fecha)}
                  variant={fecha === selectedFecha ? "contained" : "outlined"}
                  sx={{
                    margin: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Icon name="calendar alternate outline" size="big" /> {fecha}
                </Button>
              ))}
            </Box>
            <Box sx={{ width: "500px" }}>
              {gruposFunciones && gruposFunciones.length > 0 ? (
                selectedFecha &&
                gruposFunciones.find(
                  (grupo) => grupo.fecha === selectedFecha
                ) ? (
                  <AccordionFunciones
                    handleChange={handleChange}
                    expanded={expanded}
                    gruposFunciones={
                      gruposFunciones.find(
                        (grupo) => grupo.fecha === selectedFecha
                      ).grupos
                    }
                  />
                ) : (
                  <Typography variant="h5">
                    No hay funciones para la fecha seleccionada.
                  </Typography>
                )
              ) : (
                <Typography variant="h5">
                  Sin funciones con los filtros aplicados.
                </Typography>
              )}
            </Box>
          </>
        ) : (
          <Typography variant="h3" align="center">
            Sin funciones disponibles para esta semana.
          </Typography>
        )}
      </Box>
    </>
  );
}
