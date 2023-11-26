import React from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "react-native-elements";
import { useTheme } from "../../../hooks";
import { screen } from "../../../utils";
import { styled } from "./AuthScreen.style";

export function AuthScreen(props) {
  const styles = styled();
  const { navigation } = props;
  const { toggleTheme } = useTheme();

  const goToLoginEmail = () => {
    navigation.navigate(screen.auth.loginEmail);
  };

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.loginContent}>
        <Text style={styles.title}>Inicia Sesión</Text>

        <TouchableOpacity onPress={goToLoginEmail} style={styles.itemLogin}>
          <Icon type="material-community" name="at" />
          <Text>Usuario correo electrónico</Text>
          <View />
        </TouchableOpacity>
      </View>

      <View style={styles.loginContent}>
        <Text>
          ¿Ya estás registrado?{" "}
          <Text style={styles.login} onPress={goToLoginEmail}>
            Iniciar Sesión
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
