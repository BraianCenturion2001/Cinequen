import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "./LoginScreen.styles";
import { Formik, useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginScreen.data";

export function LoginScreen(props) {
  const { navigation } = props;
  const [showPassword, setShowPassword] = useState();

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {},
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
