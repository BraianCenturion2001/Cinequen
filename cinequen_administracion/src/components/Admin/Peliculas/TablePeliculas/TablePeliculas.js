import React from 'react'
import "./TablePeliculas.scss"
import { Table, Image } from "semantic-ui-react"
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"

export function TablePeliculas(props) {
    const { peliculas, editPelicula, deletePelicula } = props;
    return (
        <Table className='table-peliculas-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Póster</Table.HeaderCell>
                    <Table.HeaderCell>Duración</Table.HeaderCell>
                    <Table.HeaderCell>Clasificación</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(peliculas, (pelicula, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{pelicula.nombre}</Table.Cell>
                        <Table.Cell>
                            <Image src={pelicula.poster} />
                        </Table.Cell>
                        <Table.Cell>{pelicula.duracion}</Table.Cell>
                        <Table.Cell>{pelicula.clasificacion}</Table.Cell>
                        <Actions pelicula={pelicula} editPelicula={editPelicula} deletePelicula={deletePelicula} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { pelicula, editPelicula, deletePelicula } = props;

    return (
        <Table.Cell>
            <ButtonEdit funcion={editPelicula} objeto={pelicula} />
            <ButtonDelete funcion={deletePelicula} objeto={pelicula} />
        </Table.Cell>
    )
}