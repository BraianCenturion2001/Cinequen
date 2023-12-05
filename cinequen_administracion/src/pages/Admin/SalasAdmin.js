import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableSalas, AddEditSalaForm, DeleteSala } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useSala } from "../../hooks"

export function SalasAdmin() {

    const { loading, salas, getSalas } = useSala();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    useEffect(() => {
        document.title = 'Ver Salas';
    }, [])

    useEffect(() => {
        getSalas();
    }, [refetch])

    const addSala = () => {
        setTitleModal("Nueva Sala");
        setContentModal(<AddEditSalaForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateSala = (data) => {
        setTitleModal("Editar Sala");
        setContentModal(<AddEditSalaForm onClose={openCloseModal} onRefetch={onRefetch} sala={data} />);
        openCloseModal();
    }

    const deleteSala = (data) => {
        setTitleModal("Eliminar Sala");
        setContentModal(<DeleteSala onClose={openCloseModal} onRefetch={onRefetch} sala={data} />);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Salas" btnTitle="Agregar Sala" btnClick={addSala} />

            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <TableSalas salas={salas} updateSala={updateSala} deleteSala={deleteSala} />
                )
            }

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
