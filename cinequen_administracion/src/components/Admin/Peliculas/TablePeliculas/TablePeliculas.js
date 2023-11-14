import React from 'react'
import "./TablePeliculas.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Image } from "semantic-ui-react"
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"

function formatDuracion(duracion) {
    const horas = Math.floor(duracion / 60);
    const minutos = duracion % 60;
    return `${horas}:${minutos.toString().padStart(2, '0')}hs`;
}

const Actions = (props) => {
    const { pelicula, editPelicula, deletePelicula } = props;
    return (
        <>
            <ButtonEdit funcion={editPelicula} objeto={pelicula.acciones} />
            <ButtonDelete funcion={deletePelicula} objeto={pelicula} />
        </>
    );
};

const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 200, disableColumnMenu: true, },
    {
        field: 'poster', headerName: 'Póster', width: 130, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <><Image src={params.value} /></>
        ),
    },
    {
        field: 'duracion', headerName: 'Duración', type: 'number', width: 120, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <>{formatDuracion(params.value)}</>
        ),
    },
    { field: 'clasificacion', headerName: 'Clasificación', width: 200, disableColumnMenu: true, },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 150,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            < Actions pelicula={params.row} editPelicula={params.row.editPelicula} deletePelicula={params.row.deletePelicula} />
        ),
    }
];


export function TablePeliculas(props) {
    const { peliculas, editPelicula, deletePelicula } = props;

    const rows = map(peliculas, (pelicula, index) => ({
        id: pelicula.id,
        nombre: pelicula.nombre,
        poster: pelicula.poster,
        duracion: pelicula.duracion,
        clasificacion: pelicula.clasificacion,
        acciones: pelicula,
        editPelicula,
        deletePelicula,
    }));

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
            />
        </div>
    );
}