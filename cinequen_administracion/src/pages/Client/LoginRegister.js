import React from 'react'
import { useLocation } from 'react-router-dom';
import { LoginForm, RegisterForm } from "../../components/Client"
import "./LoginRegister.scss"

export function LoginRegister() {
    const location = useLocation();
    const isRegisterRoute = location.pathname === '/register';

    return (
        <div className='fondo-rojo'>
            {isRegisterRoute ? <RegisterForm /> : <LoginForm />}
        </div>
    )
}
