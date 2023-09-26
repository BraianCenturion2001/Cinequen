import React from 'react'
import "./DeleteSala.scss"
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useSala } from "../../../../hooks"

export function DeleteSala(props) {
    const { onClose, onRefetch, sala } = props;
    const { deleteSala } = useSala();

    const formik = useFormik({
        initialValues: {},
        validationSchema: null,
        validateOnChange: false,
        onSubmit: async () => {
            try {
                await deleteSala(sala.id);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <Form className='delete-sala-form' onSubmit={formik.handleSubmit}>
            <h3>Estás por eliminar la sala "{sala.nombre}", ¿Estás seguro?</h3>
            <div className='delete-sala-form__buttons'>
                <Button type="button" content="Cancelar" onClick={onClose} width={8} />
                <Button type='submit' content="Eliminar" negative width={8} />
            </div>
        </Form>
    )
}
