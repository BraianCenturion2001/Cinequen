import { StyleSheet, Platform } from "react-native";
import { useTheme } from "../../../hooks";

export const styles = StyleSheet.create({
  content: {
    height: "100%",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  loginForm: {
    marginTop: Platform.OS === "ios" ? 20 : 100,
  },

  btnContainer: {
    marginBottom: 20,
  },
});
