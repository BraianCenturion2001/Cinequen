import React from 'react'
import "./DeleteEstablecimiento.scss"

import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useEstablecimiento } from "../../../../hooks"

export function DeleteEstablecimiento(props) {
    const { onClose, onRefetch, establecimiento } = props;
    const { deleteEstablecimiento } = useEstablecimiento();

    const formik = useFormik({
        initialValues: {},
        validationSchema: null,
        validateOnChange: false,
        onSubmit: async () => {
            try {
                await deleteEstablecimiento(establecimiento.id);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })
    return (
        <Form className='delete-establecimiento-form' onSubmit={formik.handleSubmit}>
            <h3>Estás por eliminar al establecimiento {establecimiento.nombre}, ¿Estás seguro?</h3>
            <div className='delete-user-form__buttons'>
                <Button type="button" content="Cancelar" onClick={onClose} width={8} />
                <Button type='submit' content="Eliminar" negative width={8} />
            </div>
        </Form>
    )
}
