import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash";

const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 200, disableColumnMenu: true, },
    { field: 'tipo', headerName: 'Tipo', width: 130, disableColumnMenu: true, },
    {
        field: 'precio_entrada', headerName: 'Precio', type: 'number', width: 120, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <span>$ {params.value?.toLocaleString()}</span>
        ),
    },
    {
        field: 'activa',
        headerName: 'Activa',
        width: 120,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            params.value ? (
                <i className="fa-duotone fa-thumbs-up fa-lg" style={{ "--fa-primary-color": "#449f38", "--fa-secondary-color": "#30f915" }}></i>
            ) : (
                <i className="fa-duotone fa-thumbs-down fa-lg" style={{ "--fa-primary-color": "#8d3a3a", "--fa-secondary-color": "#ff0000" }}></i>
            )
        ),
    },
    { field: 'establecimiento_data.nombre', headerName: 'Establecimiento', width: 200, disableColumnMenu: true, },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 150,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            < Actions sala={params.row} updateSala={params.row.updateSala} deleteSala={params.row.deleteSala} />
        ),
    }
];

const Actions = (props) => {
    const { sala, updateSala, deleteSala } = props;
    return (
        <>
            <ButtonEdit funcion={updateSala} objeto={sala} />
            <ButtonDelete funcion={deleteSala} objeto={sala} />
        </>
    );
};

export function TableSalas(props) {
    const { salas, updateSala, deleteSala } = props;

    const rows = map(salas, (sala, index) => ({
        id: sala.id,
        nombre: sala.nombre,
        tipo: sala.tipo,
        precio_entrada: sala.precio_entrada,
        activa: sala.activa,
        'establecimiento_data.nombre': sala.establecimiento_data.nombre,
        acciones: sala,
        updateSala,
        deleteSala,
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