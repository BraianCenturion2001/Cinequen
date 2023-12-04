import React, { useEffect } from 'react'

export function Perfil() {
    useEffect(() => {
        document.title = 'Mi Perfil';
    }, [])

    return (
        <div>Mi Perfil</div>
    )
}
