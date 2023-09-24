import React, { useEffect, useState } from 'react'
import { HeaderPage, TableUsers, AddEditUserForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useUser } from "../../hooks"
import { Loader } from "semantic-ui-react"


export function UsersAdmin() {
    const { loading, users, getUsers } = useUser();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    useEffect(() => {
        getUsers();
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addUser = () => {
        setTitleModal("Nuevo Usuario");
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateUser = (data) => {
        setTitleModal("Editar Usuario");
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} user={data} />);
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
                <TableUsers users={users} updateUser={updateUser} />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
