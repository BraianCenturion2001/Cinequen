import React from 'react'
import "./TableFunciones.scss"
import { Table, Button, Icon } from "semantic-ui-react"
import { map } from "lodash"

export function TableFunciones(props) {
    const { funciones } = props;

    const convertirFormatoHora = (hora) => {
        const [horas, minutos, segundos] = hora.split(':');
        const horasFormato12 = parseInt(horas, 10) % 12 || 12;
        return `${horasFormato12}:${minutos}hs`;
    };

    return (
        <Table className='table-funciones-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Fecha</Table.HeaderCell>
                    <Table.HeaderCell>Horario</Table.HeaderCell>
                    <Table.HeaderCell>Sala</Table.HeaderCell>
                    <Table.HeaderCell>Pelicula</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(funciones, (funcion, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{funcion.fecha}</Table.Cell>
                        <Table.Cell>{convertirFormatoHora(funcion.hora_inicio)} a {convertirFormatoHora(funcion.hora_fin)}</Table.Cell>
                        <Table.Cell>{funcion.sala_data.nombre} - {funcion.sala_data.establecimiento_data.nombre}</Table.Cell>
                        <Table.Cell>{funcion.pelicula_data.nombre}</Table.Cell>
                        <Actions funcion={funcion} /* updateSala={updateSala} deleteSala={deleteSala} */ />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { funcion, /* updateSala, deleteSala  */ } = props;

    return (
        <Table.Cell>
            <Button icon color='yellow' /* onClick={() => updateSala(sala)} */>
                <Icon name='pencil' />
            </Button>
            <Button icon negative /* onClick={() => deleteSala(sala)}  */>
                <Icon name='trash alternate' />
            </Button>
        </Table.Cell>
    )
}
