import React from 'react'
import "./TableEstablecimientos.scss"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from "semantic-ui-react"
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"


const Actions = (props) => {
    const { establecimiento, updateEstablecimiento, deleteEstablecimiento, listFuncionesEstablecimiento, listPeliculasEstablecimiento, addPeliculaEstablecimiento } = props;
    return (
        <>
            <ButtonEdit funcion={updateEstablecimiento} objeto={establecimiento.acciones} />
            <ButtonDelete funcion={deleteEstablecimiento} objeto={establecimiento} />
            <Button title="Ver Funciones" icon color="orange" onClick={() => listFuncionesEstablecimiento(establecimiento)} >
                <i class="fa-duotone fa-calendars fa-lg"></i>
            </Button>
            <Button title="Ver Peliculas" icon color="purple" onClick={() => listPeliculasEstablecimiento(establecimiento)} >
                <i class="fa-duotone fa-list fa-lg"></i>
            </Button>
            <Button title="Eliminar Establecimiento" icon color='teal' onClick={() => addPeliculaEstablecimiento(establecimiento)}>
                <i class="fa-duotone fa-link fa-lg"></i>
            </Button>
        </>
    );
};

const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', width: 200, disableColumnMenu: true, },
    { field: 'direccion', headerName: 'Dirección', width: 170, disableColumnMenu: true, },
    {
        field: 'provincia', headerName: 'Locación', width: 200, disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <>
                {`${params.value}, ${params.row.provincia}`}
            </>
        ),
    },
    { field: 'horario_apertura', headerName: 'Horarios', width: 130, disableColumnMenu: true, },
    {
        field: 'acciones',
        headerName: 'Acciones',
        width: 250,
        align: 'center',
        disableColumnMenu: true,
        renderCell: (params: GridValueGetterParams) => (
            <Actions
                establecimiento={params.row}
                updateEstablecimiento={params.row.updateEstablecimiento}
                deleteEstablecimiento={params.row.deleteEstablecimiento}
                listFuncionesEstablecimiento={params.row.listFuncionesEstablecimiento}
                listPeliculasEstablecimiento={params.row.listPeliculasEstablecimiento}
                addPeliculaEstablecimiento={params.row.addPeliculaEstablecimiento}
            />
        ),
    }
];

export function TableEstablecimientos(props) {
    const { establecimientos, updateEstablecimiento, deleteEstablecimiento, listFuncionesEstablecimiento, listPeliculasEstablecimiento, addPeliculaEstablecimiento } = props;


    const rows = map(establecimientos, (establecimiento, index) => ({
        id: establecimiento.id,
        nombre: establecimiento.nombre,
        direccion: establecimiento.direccion,
        provincia: establecimiento.provincia,
        horario_apertura: establecimiento.horario_apertura,
        acciones: establecimiento,
        updateEstablecimiento,
        deleteEstablecimiento,
        listFuncionesEstablecimiento,
        listPeliculasEstablecimiento,
        addPeliculaEstablecimiento,
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
