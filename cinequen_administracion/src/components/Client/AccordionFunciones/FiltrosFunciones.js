import React, { useState } from "react";
import { Box } from "@mui/material";
import { Button, Dropdown } from "semantic-ui-react";

export function FiltrosFunciones(props) {
  const { aplicarFiltros } = props;

  const tipoOptions = [
    { key: "1", value: "Sala Común", text: "Sala Común" },
    { key: "2", value: "Sala Midway", text: "Sala Midway" },
    { key: "3", value: "Sala Centurión", text: "Sala Centurión" },
    { key: "4", value: "Sala 4-Buster", text: "Sala 4-Buster" },
  ];

  const [tipoSalaSeleccionado, setTipoSalaSeleccionado] = useState(null);
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(null);
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);

  const handleTipoSalaChange = (event, data) => {
    setTipoSalaSeleccionado(data.value);
    aplicarFiltros("tipoSala", data.value);
  };

  const handleFormatoChange = (formato) => {
    setFormatoSeleccionado(formato);
    aplicarFiltros("formato", formato);
  };

  const handleIdiomaChange = (idioma) => {
    setIdiomaSeleccionado(idioma);
    aplicarFiltros("idioma", idioma);
  };

  const handleLimpiarFiltros = () => {
    setTipoSalaSeleccionado(null);
    setFormatoSeleccionado(null);
    setIdiomaSeleccionado(null);
    aplicarFiltros("tipoSala", null);
    aplicarFiltros("formato", null);
    aplicarFiltros("idioma", null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 1,
        mt: "20px",
        mb: "20px",
        padding: "15px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <Dropdown
        placeholder="Tipo de Sala"
        selection
        search
        options={tipoOptions}
        onChange={handleTipoSalaChange}
        value={tipoSalaSeleccionado}
      />
      <Button.Group>
        <Button
          color="red"
          inverted
          onClick={() => handleFormatoChange("2-D")}
          active={formatoSeleccionado === "2-D"}
        >
          2-D
        </Button>
        <Button.Or />
        <Button
          color="red"
          inverted
          onClick={() => handleFormatoChange("3-D")}
          active={formatoSeleccionado === "3-D"}
        >
          3-D
        </Button>
      </Button.Group>
      <Button.Group>
        <Button
          color="violet"
          inverted
          onClick={() => handleIdiomaChange("Español")}
          active={idiomaSeleccionado === "Español"}
        >
          Español
        </Button>
        <Button.Or />
        <Button
          color="violet"
          inverted
          onClick={() => handleIdiomaChange("Subtitulado")}
          active={idiomaSeleccionado === "Subtitulado"}
        >
          Subtitulado
        </Button>
      </Button.Group>
      <Button inverted color="orange" onClick={() => handleLimpiarFiltros()}>
        Ver Todo
      </Button>
    </Box>
  );
}
