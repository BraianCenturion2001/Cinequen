import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { HeaderPage, TableEstablecimientos, AddEditEstablecimientoForm, DeleteEstablecimiento, ListPeliculaEstablecimiento, ListFuncionesEstablecimiento, AddPeliculaEstablecimientoForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useEstablecimiento } from "../../hooks"

export function EstablecimientosAdmin() {

    const { loading, establecimientos, getEstablecimientos } = useEstablecimiento();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    useEffect(() => {
        getEstablecimientos();
    }, [refetch])

    const addEstablecimiento = () => {
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
    }

    const listFuncionesEstablecimiento = (data) => {
        setTitleModal("Ver Funciones de " + data.nombre);
        setContentModal(<ListFuncionesEstablecimiento onClose={openCloseModal} onRefetch={onRefetch} establecimiento={data} />);
        openCloseModal();
    }

    const listPeliculasEstablecimiento = (data) => {
        setTitleModal("Ver Peliculas de " + data.nombre);
        setContentModal(<ListPeliculaEstablecimiento onClose={openCloseModal} onRefetch={onRefetch} establecimiento={data} />);
        openCloseModal();
    }

    const addPeliculaEstablecimiento = (data) => {
        setTitleModal("Nuevo Pelicula para " + data.nombre);
        setContentModal(<AddPeliculaEstablecimientoForm onClose={openCloseModal} onRefetch={onRefetch} establecimiento={data} />);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Establecimientos" btnTitle="Nuevo establecimiento" btnClick={addEstablecimiento} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando
                </Loader>
            ) : (
                <TableEstablecimientos
                    establecimientos={establecimientos}
                    updateEstablecimiento={updateEstablecimiento}
                    deleteEstablecimiento={deleteEstablecimiento}
                    listFuncionesEstablecimiento={listFuncionesEstablecimiento}
                    listPeliculasEstablecimiento={listPeliculasEstablecimiento}
                    addPeliculaEstablecimiento={addPeliculaEstablecimiento}
                />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
