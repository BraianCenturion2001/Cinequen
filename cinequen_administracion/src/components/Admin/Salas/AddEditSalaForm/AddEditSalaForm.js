import React, { useState, useEffect } from 'react'
import "./AddEditSalaForm.scss"
import { Form, Button, Checkbox, Dropdown } from "semantic-ui-react"
import { useEstablecimiento, useSala } from "../../../../hooks"
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from 'lodash';

export function AddEditSalaForm(props) {
    const [establecimientosFormato, setEstablecimientosFormato] = useState([])
    const { onClose, onRefetch, sala } = props;
    const { establecimientos, getEstablecimientos } = useEstablecimiento();

    const { addSala, updateSala } = useSala();

    useEffect(() => {
        getEstablecimientos()
    }, [])

    useEffect(() => {
        setEstablecimientosFormato(formatDropdownData(establecimientos))
    }, [establecimientos])

    const tipoOptions = [
        { key: '1', value: '2D', text: 'Sala 2D' },
        { key: '2', value: '3D', text: 'Sala 3D' },
        { key: '3', value: '4D', text: 'Sala 4D' },
        { key: '4', value: 'MS', text: 'Sala Monster Screen' },
    ];

    const formik = useFormik({
        initialValues: initialValues(sala),
        validationSchema: Yup.object(sala ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (sala) await updateSala(sala.id, formValue);
                else await addSala(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='add-edit-sala-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="nombre" placeholder="Nombre de la sala" value={formik.values.nombre} onChange={formik.handleChange} error={formik.errors.nombre}></Form.Input>
            <Form.Input name="precio_entrada" placeholder="Precio de Entrada" value={formik.values.precio_entrada} onChange={formik.handleChange} error={formik.errors.precio_entrada}></Form.Input>

            <Dropdown placeholder='Tipo de sala' fluid selection search options={tipoOptions} value={formik.values.tipo} onChange={(_, data) => formik.setFieldValue('tipo', data.value)} error={formik.errors.tipo} />

            <Dropdown placeholder='Establecimiento' fluid selection search options={establecimientosFormato} value={formik.values.establecimiento} onChange={(_, data) => formik.setFieldValue('establecimiento', data.value)} error={formik.errors.establecimiento} />

            <div className='add-edit-sala-form__active'>
                <Checkbox toggle checked={formik.values.activa} onChange={(_, data) => formik.setFieldValue('activa', data.checked)} />
                Sala Activa
            </div>

            <Button type='submit' content={sala ? "Actualizar" : "Registrar"} color={sala ? "yellow" : "green"} fluid />
        </Form >
    )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.nombre,
        value: item.id
    }));
}

function initialValues(data) {
    return {
        nombre: data?.nombre || "",
        precio_entrada: data?.precio_entrada || "",
        tipo: data?.tipo || "",
        establecimiento: data?.establecimiento || "",
        activa: data?.activa ? true : false,
    }
}

function newSchema() {
    return {
        nombre: Yup.string().required(true),
        precio_entrada: Yup.string().required(true),
        tipo: Yup.string().required(true),
        establecimiento: Yup.string().required(true),
        activa: Yup.bool().required(true),
    }
}

function updateSchema() {
    return {
        nombre: Yup.string().required(true),
        precio_entrada: Yup.string().required(true),
        tipo: Yup.string().required(true),
        establecimiento: Yup.string().required(true),
        activa: Yup.bool(),
    }
}
