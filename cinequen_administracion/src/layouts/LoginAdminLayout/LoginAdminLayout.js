import React from 'react'
import { useAuth } from "../../hooks"
import { LoginAdmin } from "../../pages/Admin"
import { useNavigate } from "react-router-dom";

export function LoginAdminLayout() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    console.log(auth);

    if (auth) {
        navigate("/admin");
        return null;
    }

    return (
        <LoginAdmin />
    )
}
