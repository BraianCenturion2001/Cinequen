import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ButtonEdit } from "../../Buttons"
import { Image } from "semantic-ui-react"
import { map } from "lodash";

const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 200, disableColumnMenu: true, },
    { field: 'tipo', headerName: 'Tipo', width: 130, disableColumnMenu: true, },
    {
        field: 'imagen', headerName: 'Foto', width: 130, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <><Image src={params.value} /></>
        ),
    },
    { field: 'precio_puntos', headerName: 'Precio Puntos', width: 130, disableColumnMenu: true, },
    { field: 'stock', headerName: 'Stock', width: 130, disableColumnMenu: true, },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 150,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            < Actions producto={params.row.acciones} updateProductoCanje={params.row.updateProductoCanje} />
        ),
    }
];

const Actions = (props) => {
    const { producto, updateProductoCanje } = props;
    return (
        <>
            <ButtonEdit funcion={updateProductoCanje} objeto={producto} />
        </>
    );
};

export function TableProductos(props) {
    const { productos, updateProductoCanje } = props;

    const rows = map(productos, (producto, index) => ({
        id: producto.id,
        nombre: producto.nombre,
        tipo: producto.tipo,
        imagen: producto.imagen,
        precio_puntos: producto.precio_puntos,
        stock: producto.stock,
        acciones: producto,
        updateProductoCanje,
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
