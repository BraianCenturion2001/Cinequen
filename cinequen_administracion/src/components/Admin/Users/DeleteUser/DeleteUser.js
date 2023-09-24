import React from 'react'
import "./DeleteUser.scss"
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useUser } from "../../../../hooks"

export function DeleteUser(props) {
    const { onClose, onRefetch, user } = props;
    const { deleteUser } = useUser();

    const formik = useFormik({
        initialValues: {},
        validationSchema: null,
        validateOnChange: false,
        onSubmit: async () => {
            try {
                await deleteUser(user.id);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error)
            }
        }
    })

    const renderName = () => {
        if (user?.first_name && user?.last_name) {
            return `${user.first_name} ${user.last_name}`
        }

        return user?.username;
    }

    return (
        <Form className='delete-user-form' onSubmit={formik.handleSubmit}>
            <h3>Estás por eliminar al usuario {renderName()}, ¿Estás seguro?</h3>
            <div className='delete-user-form__buttons'>
                <Button type="button" content="Cancelar" onClick={onClose} width={8} />
                <Button type='submit' content="Eliminar" negative width={8} />
            </div>
        </Form>
    )
}
