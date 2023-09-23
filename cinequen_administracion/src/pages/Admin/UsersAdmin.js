import React, { useEffect } from 'react'
import { HeaderPage, TableUsers } from "../../components/Admin"
import { useUser } from "../../hooks"
import { Loader } from "semantic-ui-react"

export function UsersAdmin() {
    const { loading, users, getUsers } = useUser();

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <>
            <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" />

            {loading ? (
                <Loader active inline="centered">
                    Cargando
                </Loader>
            ) : (
                <TableUsers users={users} />
            )}
        </>
    )
}
