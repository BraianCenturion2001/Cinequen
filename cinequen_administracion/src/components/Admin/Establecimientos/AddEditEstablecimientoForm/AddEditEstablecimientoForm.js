import React from 'react'
import "./AddEditEstablecimientoForm.scss"
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEstablecimiento } from "../../../../hooks"

export function AddEditEstablecimientoForm(props) {
    const { onClose, onRefetch, establecimiento } = props;
    const { addEstablecimiento, updateEstablecimiento } = useEstablecimiento();

    const formik = useFormik({
        initialValues: initialValues(establecimiento),
        validationSchema: Yup.object(newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (establecimiento) await updateEstablecimiento(establecimiento.id, formValue);
                else await addEstablecimiento(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='add-edit-establecimiento-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="nombre" value={formik.values.nombre} onChange={formik.handleChange} error={formik.errors.nombre} placeholder="Nombre del establecimiento"></Form.Input>
            <Form.Input name="direccion" value={formik.values.direccion} onChange={formik.handleChange} error={formik.errors.direccion} placeholder="Dirección"></Form.Input>
            <Form.Input name="ciudad" value={formik.values.ciudad} onChange={formik.handleChange} error={formik.errors.ciudad} placeholder="Ciudad"></Form.Input>
            <Form.Input name="provincia" value={formik.values.provincia} onChange={formik.handleChange} error={formik.errors.provincia} placeholder="Provincia"></Form.Input>
            <Form.Input name="horario_apertura" value={formik.values.horario_apertura} onChange={formik.handleChange} error={formik.errors.horario_apertura} placeholder="Horarios de apertura"></Form.Input>

            <Button type='submit' content={establecimiento ? "Actualizar" : "Registrar"} color={establecimiento ? "yellow" : "green"} fluid />
        </Form>
    )
}

function initialValues(data) {
    return {
        nombre: data?.nombre || "",
        direccion: data?.direccion || "",
        ciudad: data?.ciudad || "",
        provincia: data?.provincia || "",
        horario_apertura: data?.horario_apertura || "",
    }
}

function newSchema() {
    return {
        nombre: Yup.string().required(true),
        direccion: Yup.string().required(true),
        ciudad: Yup.string().required(true),
        provincia: Yup.string().required(true),
        horario_apertura: Yup.string().required(true),
    }
}