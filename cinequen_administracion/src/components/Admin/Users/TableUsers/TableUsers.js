import React from 'react'
import "./TableUsers.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"

function renderIcon(value) {
    if (value) {
        return (
            <i className="fa-duotone fa-thumbs-up fa-lg" style={{ "--fa-primary-color": "#449f38", "--fa-secondary-color": "#30f915" }}></i>
        );
    } else {
        return (
            <i className="fa-duotone fa-thumbs-down fa-lg" style={{ "--fa-primary-color": "#8d3a3a", "--fa-secondary-color": "#ff0000" }}></i>
        );
    }
}

const columns: GridColDef[] = [
    { field: 'username', headerName: 'Nombre de Usuario', width: 200, disableColumnMenu: true, },
    { field: 'email', headerName: 'Correo', width: 150, disableColumnMenu: true, },
    {
        field: 'nombre', headerName: 'Nombre Completo', type: 'number', width: 200, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <span>{params.value} {params.row.acciones.last_name}</span>
        ),
    },
    {
        field: 'is_active', headerName: 'Activo', width: 120, align: 'center', disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <>{renderIcon(params.value)}</>
        ),
    },
    {
        field: 'is_staff', headerName: 'Staff', width: 120, align: 'center', disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <>{renderIcon(params.value)}</>
        ),
    },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 150,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            < Actions user={params.row.acciones} updateUser={params.row.updateUser} deleteUser={params.row.deleteUser} />
        ),
    }
];


const Actions = (props) => {
    const { user, updateUser, deleteUser } = props;
    return (
        <>
            <ButtonEdit funcion={updateUser} objeto={user} />
            <ButtonDelete funcion={deleteUser} objeto={user} />
        </>
    );
};


export function TableUsers(props) {
    const { users, updateUser, deleteUser } = props;

    const rows = map(users, (user, index) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        nombre: user.first_name,
        is_active: user.is_active,
        is_staff: user.is_staff,
        acciones: user,
        updateUser,
        deleteUser,
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
