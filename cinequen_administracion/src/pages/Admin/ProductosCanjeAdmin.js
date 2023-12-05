import React, { useEffect, useState } from 'react';
import { Loader } from "semantic-ui-react"
import { HeaderPage, AddEditProductoForm, TableProductos } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useProductoCanje } from "../../hooks"

export function ProductosCanjeAdmin() {
    const { loading, productos, getProductosCanje } = useProductoCanje();
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState(null)
    const [refetch, setRefetch] = useState(false)
    const [contentModal, setContentModal] = useState(null)

    useEffect(() => {
        document.title = 'Ver Productos';
    }, [])

    useEffect(() => {
        getProductosCanje();
    }, [refetch])

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addProductoCanje = () => {
        setTitleModal("Nuevo Producto de Canje");
        setContentModal(<AddEditProductoForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    const updateProductoCanje = (data) => {
        setTitleModal("Editar Producto de Canje");
        setContentModal(<AddEditProductoForm onClose={openCloseModal} onRefetch={onRefetch} producto={data} />);
        openCloseModal();
    }

    return (
        <>
            <HeaderPage title="Productos de Canje" btnTitle="Nuevo producto" btnClick={addProductoCanje} />

            {loading ? (
                <Loader active inline="centered">
                    Cargando
                </Loader>
            ) : (
                <TableProductos productos={productos} updateProductoCanje={updateProductoCanje} />
            )}

            <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal} />
        </>
    )
}
