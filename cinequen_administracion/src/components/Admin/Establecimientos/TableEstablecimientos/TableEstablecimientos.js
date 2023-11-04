import React from 'react'
import "./TableEstablecimientos.scss"
import { Table, Button } from "semantic-ui-react"
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"

export function TableEstablecimientos(props) {
    const { establecimientos, updateEstablecimiento, deleteEstablecimiento, listFuncionesEstablecimiento, listPeliculasEstablecimiento, addPeliculaEstablecimiento } = props;

    return (
        <Table className='table-establecimientos-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Dirección</Table.HeaderCell>
                    <Table.HeaderCell>Ciudad</Table.HeaderCell>
                    <Table.HeaderCell>Provincia</Table.HeaderCell>
                    <Table.HeaderCell>Horarios</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(establecimientos, (establecimiento, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{establecimiento.nombre}</Table.Cell>
                        <Table.Cell>{establecimiento.direccion}</Table.Cell>
                        <Table.Cell>{establecimiento.ciudad}</Table.Cell>
                        <Table.Cell>{establecimiento.provincia}</Table.Cell>
                        <Table.Cell>{establecimiento.horario_apertura}</Table.Cell>
                        <Actions
                            establecimiento={establecimiento}
                            updateEstablecimiento={updateEstablecimiento}
                            deleteEstablecimiento={deleteEstablecimiento}
                            listFuncionesEstablecimiento={listFuncionesEstablecimiento}
                            listPeliculasEstablecimiento={listPeliculasEstablecimiento}
                            addPeliculaEstablecimiento={addPeliculaEstablecimiento}
                        />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { establecimiento, updateEstablecimiento, deleteEstablecimiento, listFuncionesEstablecimiento, listPeliculasEstablecimiento, addPeliculaEstablecimiento } = props;

    return (
        <Table.Cell textAlign='right'>
            <ButtonEdit funcion={updateEstablecimiento} objeto={establecimiento} />
            <ButtonDelete funcion={deleteEstablecimiento} objeto={establecimiento} />
            <Button title="Ver Funciones" icon color="orange" onClick={() => listFuncionesEstablecimiento(establecimiento)} >
                <i class="fa-duotone fa-calendars fa-lg"></i>
            </Button>
            <Button title="Ver Peliculas" icon color="purple" onClick={() => listPeliculasEstablecimiento(establecimiento)} >
                <i class="fa-duotone fa-list fa-lg"></i>
            </Button>
            <Button title="Eliminar Establecimiento" icon color='teal' onClick={() => addPeliculaEstablecimiento(establecimiento)}>
                <i class="fa-duotone fa-link fa-lg"></i>
            </Button>
        </Table.Cell>

    )
}