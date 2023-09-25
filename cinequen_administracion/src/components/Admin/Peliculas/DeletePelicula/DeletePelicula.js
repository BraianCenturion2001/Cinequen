import React from 'react'
import "./DeletePelicula.scss"
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { usePelicula } from "../../../../hooks"


export function DeletePelicula(props) {
    const { onClose, onRefetch, pelicula } = props;
    const { deletePelicula } = usePelicula();

    const formik = useFormik({
        initialValues: {},
        validationSchema: null,
        validateOnChange: false,
        onSubmit: async () => {
            try {
                await deletePelicula(pelicula.id);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })


    return (
        <Form className='delete-pelicula-form' onSubmit={formik.handleSubmit}>
            <h3>Estás por eliminar la pelicula "{pelicula.nombre}", ¿Estás seguro?</h3>
            <div className='delete-pelicula-form__buttons'>
                <Button type="button" content="Cancelar" onClick={onClose} width={8} />
                <Button type='submit' content="Eliminar" negative width={8} />
            </div>
        </Form>
    )
}
