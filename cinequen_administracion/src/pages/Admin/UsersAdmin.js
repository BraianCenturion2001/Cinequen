import React, { useEffect, useState } from 'react'
import { HeaderPage, TableUsers, AddEditUserForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useUser } from "../../hooks"
import { Loader } from "semantic-ui-react"


export function UsersAdmin() {
    const { loading, users, getUsers } = useUser();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [contentModal, setContentModal] = useState(null)

    useEffect(() => {
        getUsers();
    }, [])

    const openCloseModal = () => setShowModal((prev) => !prev);

    const addUser = () => {
        setTitleModal("Nuevo Usuario");
        setContentModal(<AddEditUserForm />);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando
                </Loader>
            ) : (
                <TableUsers users={users} />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
