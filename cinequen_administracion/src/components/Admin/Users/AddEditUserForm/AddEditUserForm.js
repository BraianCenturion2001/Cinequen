import React from 'react'
import { Form, Button, Checkbox } from "semantic-ui-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks"
import "./AddEditUserForm.scss";


export function AddEditUserForm(props) {
    const { onClose, onRefetch } = props;
    const { addUser } = useUser();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(newValidationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                await addUser(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="username" value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username} placeholder="Nombre de usuario"></Form.Input>
            <Form.Input name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.username} placeholder="Correo electronico"></Form.Input>
            <Form.Input name="first_name" value={formik.values.first_name} onChange={formik.handleChange} error={formik.errors.username} placeholder="Nombre"></Form.Input>
            <Form.Input name="last_name" value={formik.values.last_name} onChange={formik.handleChange} error={formik.errors.username} placeholder="Apellido"></Form.Input>
            <Form.Input name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.username} type='password' placeholder="Contraseña"></Form.Input>
            <div className='add-edit-user-form__active'>
                <Checkbox toggle checked={formik.values.is_active} onChange={(_, data) => formik.setFieldValue('is_active', data.checked)} /> Usuario Activo
            </div>
            <div className='add-edit-user-form__staff'>
                <Checkbox toggle checked={formik.values.is_staff} onChange={(_, data) => formik.setFieldValue('is_staff', data.checked)} /> Usuario Administrador
            </div>

            <Button type='submit' content="Crear" primary fluid />
        </Form>
    )
}

function initialValues() {
    return {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        is_active: true,
        is_staff: false,
    }
}

function newValidationSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string().required(true),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}
