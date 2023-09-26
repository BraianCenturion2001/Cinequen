import React from 'react';
import "./LoginForm.scss";
import { Button, Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { loginApi } from "../../../api/user";
import { useAuth } from "../../../hooks"

export function LoginForm() {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                const response = await loginApi(formValue)
                const { access } = response;
                login(access)
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    })

    return (
        <Form className='login-form-admin' onSubmit={formik.handleSubmit} >
            <Form.Input
                name="email"
                placeholder="Correo electronico"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Button type='submit' content="Iniciar Sesión" inverted fluid>
                <Icon name="sign-in" />
                Iniciar Sesión
            </Button>
        </ Form>
    )
}


function initialValues() {
    return {
        email: "",
        password: ""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true)
    }
}

