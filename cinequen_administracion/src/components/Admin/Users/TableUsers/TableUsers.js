import React from 'react'
import "./TableUsers.scss"
import { Table } from "semantic-ui-react"
import { ButtonDelete, ButtonEdit } from "../../Buttons"
import { map } from "lodash"


export function TableUsers(props) {
    const { users, updateUser, deleteUser } = props;

    function renderIcon(isPositive, isActive) {
        if (isPositive) {
            return (
                <i className="fa-duotone fa-thumbs-up fa-lg" style={{ "--fa-primary-color": "#449f38", "--fa-secondary-color": "#30f915" }}></i>
            );
        } else {
            return (
                <i className="fa-duotone fa-thumbs-down fa-lg" style={{ "--fa-primary-color": "#8d3a3a", "--fa-secondary-color": "#ff0000" }}></i>
            );
        }
    }

    return (
        <Table className='table-users-admin'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre de Usuario</Table.HeaderCell>
                    <Table.HeaderCell>Correo</Table.HeaderCell>
                    <Table.HeaderCell>Nombres</Table.HeaderCell>
                    <Table.HeaderCell>Apellidos</Table.HeaderCell>
                    <Table.HeaderCell>Activo</Table.HeaderCell>
                    <Table.HeaderCell>Staff</Table.HeaderCell>
                    <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {map(users, (user, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.first_name}</Table.Cell>
                        <Table.Cell>{user.last_name}</Table.Cell>
                        <Table.Cell className='status'>
                            {renderIcon(user.is_active)}
                        </Table.Cell>
                        <Table.Cell className='status'>
                            {renderIcon(user.is_staff)}
                        </Table.Cell>
                        <Actions user={user} updateUser={updateUser} deleteUser={deleteUser} />
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

function Actions(props) {
    const { user, updateUser, deleteUser } = props;

    return (
        <Table.Cell textAlign='right'>
            <ButtonEdit funcion={updateUser} objeto={user} />
            <ButtonDelete funcion={deleteUser} objeto={user} />
        </Table.Cell>
    )
}