import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@rneui/themed";
import { useAuth } from "../../../hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function HomeScreen() {
  const { me, logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido{" "}
        <Text style={styles.name}>
          {me.first_name} {me.last_name}{" "}
        </Text>
        a Cinequén Scanner App!
      </Text>
      <Button
        icon={
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="#ffffff"
            style={{ marginRight: 10 }}
          />
        }
        color="error"
        onPress={logout}
        buttonStyle={{ marginHorizontal: 20 }}
        title={"Cerrar sesión"}
      />
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
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
