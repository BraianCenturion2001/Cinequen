import React, { useEffect, useState } from 'react';
import { Loader } from "semantic-ui-react"
import { HeaderPage, TablePeliculas, AddEditPeliculaForm, DeletePelicula } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { usePelicula } from "../../hooks"

export function PeliculasAdmin() {

    const { loading, peliculas, getPeliculas } = usePelicula();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    useEffect(() => {
        document.title = 'Ver Peliculas';
    }, [])

    useEffect(() => {
        getPeliculas();
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addPelicula = () => {
        setTitleModal("Nueva Película");
        setContentModal(<AddEditPeliculaForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const editPelicula = (data) => {
        setTitleModal("Editar Película");
        setContentModal(<AddEditPeliculaForm onClose={openCloseModal} onRefetch={onRefetch} pelicula={data} />);
        openCloseModal();
    }

    const deletePelicula = (data) => {
        setTitleModal("Eliminar Película");
        setContentModal(<DeletePelicula onClose={openCloseModal} onRefetch={onRefetch} pelicula={data} />);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Peliculas" btnTitle="Nueva pelicula" btnClick={addPelicula} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando
                </Loader>
            ) : (
                <TablePeliculas peliculas={peliculas} editPelicula={editPelicula} deletePelicula={deletePelicula} />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
