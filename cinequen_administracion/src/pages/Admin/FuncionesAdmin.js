import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableFunciones, AddFuncionForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useFuncion } from "../../hooks"

export function FuncionesAdmin() {
    const { loading, funciones, getFunciones } = useFuncion();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    useEffect(() => {
        getFunciones();
    }, [refetch])

    const addFuncion = () => {
        setTitleModal("Nueva Funcion");
        setContentModal(<AddFuncionForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateFuncion = (data) => {
        setTitleModal("Editar Funcón");
        setContentModal(<AddFuncionForm onClose={openCloseModal} onRefetch={onRefetch} funcion={data} />);
        openCloseModal();
    }

    /*
    const deleteEstablecimiento = (data) => {
        setTitleModal("Eliminar Establecimiento");
        setContentModal(<DeleteEstablecimiento onClose={openCloseModal} onRefetch={onRefetch} establecimiento={data} />);
        openCloseModal();
    } */

    return (
        <>
            <HeaderPage title="Funciones de Cine" btnTitle="Agregar Funcion" btnClick={addFuncion} />

            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <TableFunciones funciones={funciones} updateFuncion={updateFuncion} /* deleteSala={deleteSala} */ />
                )
            }

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
