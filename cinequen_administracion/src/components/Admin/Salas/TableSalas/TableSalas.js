import React from 'react'
import "./TableSalas.scss"
import { Table, Button, Icon } from "semantic-ui-react"
import { map } from "lodash"

export function TableSalas(props) {
    const { salas, updateSala, deleteSala } = props;

    return (
        <Table className='table-salas-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Tipo</Table.HeaderCell>
                    <Table.HeaderCell>Precio</Table.HeaderCell>
                    <Table.HeaderCell>Activa</Table.HeaderCell>
                    <Table.HeaderCell>Establecimiento</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(salas, (sala, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{sala.nombre}</Table.Cell>
                        <Table.Cell>{sala.tipo}</Table.Cell>
                        <Table.Cell>$ {sala.precio_entrada}</Table.Cell>
                        <Table.Cell className='status'>
                            {sala.activa ? <Icon name='check' /> : <Icon name='close' />}
                        </Table.Cell>
                        <Table.Cell>{sala.establecimiento_data.nombre}</Table.Cell>
                        <Actions sala={sala} updateSala={updateSala} deleteSala={deleteSala} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { sala, updateSala, deleteSala } = props;

    return (
        <Table.Cell>
            <Button icon color='yellow' onClick={() => updateSala(sala)}>
                <Icon name='pencil' />
            </Button>
            <Button icon negative onClick={() => deleteSala(sala)} >
                <Icon name='trash alternate' />
            </Button>
        </Table.Cell>
    )
}