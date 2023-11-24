import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";
import { useTheme } from "../../../hooks";
import { screen } from "../../../utils";

export function AuthScreen(props) {
  const { navigation } = props;
  const { toggleTheme } = useTheme();
  return (
    <View>
      <Text>AuthScreen</Text>
      <Button title={"Cambiar Tema"} onPress={toggleTheme} />
      <Button
        title={"Login"}
        onPress={() => navigation.navigate(screen.auth.loginEmail)}
      />
    </View>
  );
}
