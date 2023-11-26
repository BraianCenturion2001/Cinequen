import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CustomModal } from "./Modal";
import { useNavigation } from "@react-navigation/native";

export function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [reloadScanner, setReloadScanner] = useState(false);
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something - for example: reset states, ask for camera permission
      setScanned(false);
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    const dataStr = JSON.stringify(data);
    const dataObj = JSON.parse(dataStr);
    if (dataObj.startsWith("http://192.168.100.7:8000/api/entradas/")) {
      setReloadScanner(true);
      navigation.navigate("EntradaCheck", { data });
    } else {
      setScanned(true);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setReloadScanner(false);
    })();
  }, [reloadScanner]);

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Los permisos de la cámara no fueron otorgados.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        titulo={"¡QR INVÁLIDO!"}
      />
      <Text style={styles.title}>Scanea un QR para empezar.</Text>
      {renderCamera()}
      {scanned && (
        <Button
          title={"SCANEA DE NUEVO"}
          titleStyle={{ color: "white", fontWeight: "bold", fontSize: 20 }}
          onPress={() => setScanned(false)}
          buttonStyle={{
            backgroundColor: "rgba(214, 61, 57, 1)",
            borderRadius: 30,
            transition: {
              opacity: "1500ms",
              transform: "translateY(-100px)",
            },
          }}
          containerStyle={{
            height: 100,
            width: 250,
            marginVertical: 10,
          }}
        />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cameraContainer: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 30,
  },
  camera: {
    flex: 1,
  },
});
