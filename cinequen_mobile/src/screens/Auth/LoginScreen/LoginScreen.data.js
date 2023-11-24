import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Ingrese un correo electrónico válido.")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Ingrese un correo electrónico válido."
      )
      .required("Campo obligatorio."),
    password: Yup.string().required("Campo obligatorio."),
  });
}
