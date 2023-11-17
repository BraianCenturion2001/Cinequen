import React from 'react'
import { Box, TextField, Button, Grid } from '@mui/material';
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { RegisterApi } from "../../../api/user";
import { Image } from 'semantic-ui-react';
import { BASE_REACT } from "../../../utils/constants"
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        onSubmit: async (formValues) => {
            try {
                const response = await RegisterApi(formValues);
                if (response === 201) {
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        },
    });

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '10px',
                p: 3,
                width: 650,
                maxWidth: '100%',
            }}
        >
            <Image src={`${BASE_REACT}/images/Logo 1.png`} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre de Usuario"
                            variant="outlined"
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && formik.errors.username}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre Completo"
                            variant="outlined"
                            type="text"
                            name="nombre"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.nombre && formik.errors.nombre}
                            helperText={formik.touched.nombre && formik.errors.nombre}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            variant="outlined"
                            type="number"
                            name="telefono"
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.telefono && formik.errors.telefono}
                            helperText={formik.touched.telefono && formik.errors.telefono}
                        />
                    </Grid>
                </Grid>
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
                <TextField
                    variant="outlined"
                    type="text"
                    name="rol"
                    value={formik.values.rol}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rol && formik.errors.rol}
                    helperText={formik.touched.rol && formik.errors.rol}
                    sx={{ display: 'none' }}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    fullWidth
                >
                    <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '5px' }}></i> Registrarse
                </Button>
            </form>
        </Box>
    )
}


function initialValues() {
    return {
        email: "",
        password: "",
        username: "",
        nombre: "",
        telefono: "",
        rol: "CLIENTE"
    }
}

function validationSchema() {
    return Yup.object({
        username: Yup.string().required('El nombre de usuario es requerido').matches(/^@/, 'El nombre de usuario debe empezar con "@"'),
        email: Yup.string().required('El correo electrónico es requerido').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Ingrese un correo electrónico válido'), password: Yup.string().required('La contraseña es requerida'),
        nombre: Yup.string().required('El nombre es requerido'),
        telefono: Yup.string().required('El número de teléfono es requerido').matches(/^[0-9]+$/, 'Ingrese solo números en el campo de teléfono'),
        rol: Yup.string().required(true),
    });
}
