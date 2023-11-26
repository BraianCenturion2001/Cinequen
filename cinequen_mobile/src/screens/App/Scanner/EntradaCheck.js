import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { Entrada } from "../../../api";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const entradaController = new Entrada();

export function EntradaCheck({ route }) {
  const { data } = route.params;
  const navigation = useNavigation();
  const [entrada, setEntrada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await entradaController.getEntrada(data);
        setEntrada(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleValidarEntrada = async () => {
    try {
      const result = await entradaController.validarEntrada(entrada.id);
      if (result.estado === 1) {
        navigation.navigate("ScannerQR");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVolverScanQR = () => {
    navigation.navigate("ScannerQR");
  };

  function obtenerTextoFormateado(funcion_data) {
    const { fecha, hora_inicio, hora_fin } = funcion_data;

    // Formatear la fecha
    const fechaObj = new Date(fecha);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const fechaFormateada = fechaObj.toLocaleDateString("es-ES", options);
    const mesCapitalizado =
      fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

    // Formatear las horas
    const horaInicioFormateada = hora_inicio.slice(0, 5);
    const horaFinFormateada = hora_fin.slice(0, 5);

    // Construir el string final
    const textoFormateado = `${mesCapitalizado} | ${horaInicioFormateada}hs a ${horaFinFormateada}hs`;

    return textoFormateado;
  }

  const getButacas = (butacasData) => {
    const butacas = [];
    for (const butaca of butacasData) {
      butacas.push(`${butaca.butaca_data.fila}-${butaca.butaca_data.numero}`);
    }
    return butacas.join(", ");
  };

  return (
    <View style={styles.container}>
      {entrada && (
        <Card>
          <Card.Title>INFORMACIÓN DE LA ENTRADA</Card.Title>
          <Card.Divider />
          <Text style={styles.staticText}>
            ID: <Text style={styles.dynamicText}>{entrada.id}</Text>
          </Text>
          <Text style={styles.staticText}>
            ESTADO:{" "}
            <Text style={styles.dynamicText}>
              {entrada.estado ? "Validada." : "Sin validar."}
            </Text>
          </Text>
          <Text style={styles.staticText}>
            CLIENTE:{" "}
            <Text style={styles.dynamicText}>{entrada.user_data.nombre}</Text>
          </Text>
          <Text style={styles.staticText}>
            PELICULA:{" "}
            <Text style={styles.dynamicText}>
              {entrada.funcion_data.pelicula_data.nombre}
            </Text>
          </Text>
          <Text style={styles.staticText}>
            FORMATO:{" "}
            <Text style={styles.dynamicText}>
              {entrada.funcion_data.formato} | {entrada.funcion_data.idioma}
            </Text>
          </Text>
          <Text style={styles.staticText}>
            FECHA Y HORARIO:{" "}
            <Text style={styles.dynamicText}>
              {obtenerTextoFormateado(entrada.funcion_data)}
            </Text>
          </Text>
          <Text style={styles.staticText}>
            ESTABLECIMIENTO Y SALA:{" "}
            <Text style={styles.dynamicText}>
              {entrada.funcion_data.sala_data.establecimiento_data.nombre}
            </Text>{" "}
            /{" "}
            <Text style={styles.dynamicText}>
              {entrada.funcion_data.sala_data.nombre}
            </Text>
          </Text>
          <Text style={styles.staticText}>
            BUTACAS:{" "}
            <Text style={styles.dynamicText}>
              {getButacas(entrada.butacas_data)}
            </Text>
          </Text>
          <View style={styles.buttonContainer}>
            {entrada.estado ? (
              <Button
                color={"warning"}
                icon={
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="#ffffff"
                    style={{ marginRight: 10 }}
                  />
                }
                buttonStyle={{ marginHorizontal: 20 }}
                title="VOLVER"
                onPress={handleVolverScanQR}
              />
            ) : (
              <>
                <Button
                  color={"error"}
                  icon={
                    <Icon
                      name="close"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  buttonStyle={{ marginHorizontal: 20 }}
                  title="CANCELAR"
                  onPress={handleVolverScanQR}
                />
                <Button
                  color={"success"}
                  icon={
                    <Icon
                      name="check"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  buttonStyle={{ marginHorizontal: 20 }}
                  title="VALIDAR"
                  onPress={handleValidarEntrada}
                />
              </>
            )}
          </View>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  staticText: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  dynamicText: {
    marginBottom: 10,
  },
});
