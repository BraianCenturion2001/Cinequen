import React from "react";
import { Box, TextField, Button, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi } from "../../../api/user";
import { useAuth } from "../../../hooks";
import { Image } from "semantic-ui-react";
import { BASE_REACT } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValues) => {
      try {
        const response = await loginApi(formValues);
        const { access } = response;
        login(access);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        p: 3,
        width: 500,
        maxWidth: "100%",
      }}
    >
      <Image src={`${BASE_REACT}/images/Logo 1.png`} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Correo"
          variant="outlined"
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <Button
            type="button"
            variant="outlined"
            color="warning"
            onClick={() => navigate("/")}
          >
            <i
              className="fa-duotone fa-house"
              style={{ marginRight: "5px" }}
            ></i>{" "}
            Volver a Inicio
          </Button>
          <Button type="submit" variant="outlined" color="success">
            <i
              className="fa-solid fa-right-to-bracket"
              style={{ marginRight: "5px" }}
            ></i>{" "}
            Iniciar Sesión
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Aún no tienes una cuenta?
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/register")}
          >
            Registrate aquí
          </Link>
        </Box>
      </form>
    </Box>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });
}
