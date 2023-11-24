import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "./LoginScreen.styles";

export function LoginScreen(props) {
  const { navigation } = props;
  const [showPassword, setShowPassword] = useState();

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.loginForm}>
        <Input placeholder="Correo electrónico" autoCapitalize="none" />
        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: onShowPassword,
          }}
        />
      </View>

      <Button title={"Iniciar Sesión"} containerStyle={styles.btnContainer} />
    </SafeAreaView>
  );
}
