import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "./LoginScreen.styles";
import { useFormik } from "formik";
import { useAuth } from "../../../hooks";
import { Auth } from "../../../api";
import { initialValues, validationSchema } from "./LoginScreen.data";

const auth = new Auth();

export function LoginScreen(props) {
  const { navigation } = props;
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState();

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await auth.login(formValue);
        login(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.loginForm}>
        <Input
          placeholder="Correo electrónico"
          autoCapitalize="none"
          onChangeText={(text) =>
            formik.setFieldValue("email", text.toLocaleLowerCase())
          }
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          rightIcon={{
            type: "material-community",
            name: showPassword ? "eye-off-outline" : "eye-outline",
            onPress: onShowPassword,
          }}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          errorMessage={formik.errors.password}
        />
      </View>

      <Button
        title={"Iniciar Sesión"}
        containerStyle={styles.btnContainer}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </SafeAreaView>
  );
}
