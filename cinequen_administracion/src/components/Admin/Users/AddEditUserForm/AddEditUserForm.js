import React from 'react'
import { Form, Button, Checkbox } from "semantic-ui-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks"
import "./AddEditUserForm.scss";


export function AddEditUserForm(props) {
    const { onClose, onRefetch, user } = props;
    const { addUser, updateUser } = useUser();

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: Yup.object(user ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (user) await updateUser(user.id, formValue);
                else await addUser(formValue);
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
            <Form.Input name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email} placeholder="Correo electronico"></Form.Input>
            <Form.Input name="first_name" value={formik.values.first_name} onChange={formik.handleChange} error={formik.errors.first_name} placeholder="Nombre"></Form.Input>
            <Form.Input name="last_name" value={formik.values.last_name} onChange={formik.handleChange} error={formik.errors.last_name} placeholder="Apellido"></Form.Input>
            <Form.Input name="password" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password} type='password' placeholder="Contraseña"></Form.Input>
            <div className='add-edit-user-form__active'>
                <Checkbox toggle checked={formik.values.is_active} onChange={(_, data) => formik.setFieldValue('is_active', data.checked)} /> Usuario Activo
            </div>
            <div className='add-edit-user-form__staff'>
                <Checkbox toggle checked={formik.values.is_staff} onChange={(_, data) => formik.setFieldValue('is_staff', data.checked)} /> Usuario Administrador
            </div>

            <Button type='submit' content={user ? "Actualizar" : "Registrar"} color={user ? "yellow" : "green"} fluid />
        </Form>
    )
}

function initialValues(data) {
    return {
        username: data?.username || "",
        email: data?.email || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        password: "",
        is_active: data?.is_active ? true : false,
        is_staff: data?.is_staff ? true : false,
    }
}

function newSchema() {
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

function updateSchema() {
    return {
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        first_name: Yup.string(),
        last_name: Yup.string(),
        password: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true),
    }
}
