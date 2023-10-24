import React from 'react'
import { LoginRegister } from '../../pages/Client'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks';

export function LoginRegisterClientLayout() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    if (auth) {
        navigate("/");
        return null;
    }
    return (
        <LoginRegister />
    )
}
