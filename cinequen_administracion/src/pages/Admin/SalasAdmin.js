import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableSalas } from "../../components/Admin"
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
        getSalas();
    }, [refetch])

    /* const addEstablecimiento = () => {
        setTitleModal("Nuevo Establecimiento");
        setContentModal(<AddEditEstablecimientoForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateEstablecimiento = (data) => {
        setTitleModal("Editar Establecimiento");
        setContentModal(<AddEditEstablecimientoForm onClose={openCloseModal} onRefetch={onRefetch} establecimiento={data} />);
        openCloseModal();
    }

    const deleteEstablecimiento = (data) => {
        setTitleModal("Eliminar Establecimiento");
        setContentModal(<DeleteEstablecimiento onClose={openCloseModal} onRefetch={onRefetch} establecimiento={data} />);
        openCloseModal();
    } */

    return (
        <>
            <HeaderPage title="Salas" btnTitle="Nueva Sala" /* btnClick={addEstablecimiento}  */ />

            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <TableSalas salas={salas} /* updateEstablecimiento={updateEstablecimiento} deleteEstablecimiento={deleteEstablecimiento} */ />
                )
            }

            {/* <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} /> */}
        </>
    )
}
