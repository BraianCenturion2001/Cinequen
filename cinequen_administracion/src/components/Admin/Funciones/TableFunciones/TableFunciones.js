import React from 'react'
import "./TableFunciones.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"


const Actions = (props) => {
    const { funcion } = props;
    return (
        <>
            <ButtonEdit objeto={funcion} />
            <ButtonDelete objeto={funcion} />
        </>
    );
};

const convertirFormatoHora = (hora) => {
    if (hora && hora.includes(':')) {
        const [horas, minutos, segundos] = hora.split(':');
        const horasFormato12 = parseInt(horas, 10) % 12 || 12;
        return `${horasFormato12}:${minutos}hs`;
    }
    return '';
};

const columns: GridColDef[] = [
    { field: 'fecha', headerName: 'Fecha', width: 200, disableColumnMenu: true, },
    {
        field: 'hora_inicio', headerName: 'Horario', width: 130, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <span>{convertirFormatoHora(params.value)} a {convertirFormatoHora(params.row.acciones.hora_fin)}</span>
        ),
    },
    {
        field: 'sala_data.nombre', headerName: 'Sala/Establecimiento', type: 'number', width: 240, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <span>{params.value} - {params.row.acciones.sala_data.establecimiento_data.nombre}</span>
        ),
    },
    { field: 'pelicula_data.nombre', headerName: 'Película', width: 200, disableColumnMenu: true, },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 100,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            < Actions funcion={params.row} />
        ),
    }
];

export function TableFunciones(props) {
    const { funciones } = props;

    const rows = map(funciones, (funcion, index) => ({
        id: funcion.id,
        fecha: funcion.fecha,
        hora_inicio: funcion.hora_inicio,
        'sala_data.nombre': funcion.sala_data.nombre,
        'pelicula_data.nombre': funcion.pelicula_data.nombre,
        acciones: funcion,
    }));

    return (
        <div style={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
            />
        </div>
    );
}