import React from 'react'
import "./TableEstablecimientos.scss"
import { Table, Button, Icon } from "semantic-ui-react"
import { map } from "lodash"

export function TableEstablecimientos(props) {
    const { establecimientos, updateEstablecimiento, deleteEstablecimiento } = props;

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
                        <Actions establecimiento={establecimiento} updateEstablecimiento={updateEstablecimiento} deleteEstablecimiento={deleteEstablecimiento} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { establecimiento, updateEstablecimiento, deleteEstablecimiento } = props;

    return (
        <Table.Cell textAlign='right'>
            <Button icon onClick={() => updateEstablecimiento(establecimiento)}>
                <Icon name='pencil' />
            </Button>
            <Button icon negative onClick={() => deleteEstablecimiento(establecimiento)}>
                <Icon name='trash alternate' />
            </Button>
        </Table.Cell>
    )
}