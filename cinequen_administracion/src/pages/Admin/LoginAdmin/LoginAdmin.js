import React, { useEffect } from 'react'
import "./LoginAdmin.scss"
import { LoginForm } from "../../../components/Admin"
import { Image } from "semantic-ui-react"
import { BASE_REACT } from "../../../utils/constants"

export function LoginAdmin() {
    useEffect(() => {
        document.title = 'Iniciar Sesión';
    }, [])

    return (
        <div className='login-admin'>
            <div className='login-admin__content'>
                <Image src={`${BASE_REACT}/images/Logo 2.png`} />
                <LoginForm />
            </div>
        </div>
    )
}
