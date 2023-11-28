import React, { useEffect } from 'react';
import { Loader } from "semantic-ui-react"
import { useCanjes, useAuth } from "../../hooks"
import { TablaCanjes } from "../../components/Client"

export function Canjes() {
    const { canjes, getCanjes, loading } = useCanjes();
    const { auth } = useAuth();

    useEffect(() => {
        const userId = auth.me.user_id;
        getCanjes({ user: userId });
    }, []);

    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <TablaCanjes canjes={canjes} />
                )
            }
        </>
    )
}
