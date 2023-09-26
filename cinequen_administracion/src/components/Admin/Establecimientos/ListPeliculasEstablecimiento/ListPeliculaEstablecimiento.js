import React, { useEffect } from 'react'
import "./ListPeliculaEstablecimiento.scss"
import { Table, Button, Icon, Loader, Image } from "semantic-ui-react"
import { map } from "lodash"
import { usePeliculaEstablecimiento } from "../../../../hooks"

export function ListPeliculaEstablecimiento(props) {
    const { loading, peliculasEstablecimientos, getPEFiltro1 } = usePeliculaEstablecimiento();
    const { establecimiento } = props;

    useEffect(() => {
        getPEFiltro1(establecimiento.id);
    }, [])

    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <Table className='table-peliculas-establecimiento-admin'>
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
                            {map(peliculasEstablecimientos, (pelicula, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{pelicula.pelicula_data.nombre}</Table.Cell>
                                    <Table.Cell>
                                        <Image src={pelicula.pelicula_data.poster} />
                                    </Table.Cell>
                                    <Table.Cell>{pelicula.pelicula_data.duracion}</Table.Cell>
                                    <Table.Cell>{pelicula.pelicula_data.clasificacion}</Table.Cell>
                                    <Actions pelicula={pelicula} /* editPelicula={editPelicula} deletePelicula={deletePelicula}  */ />
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )
            }
        </>
    )
}

function Actions(props) {
    const { pelicula, /* updateSala, deleteSala  */ } = props;

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
