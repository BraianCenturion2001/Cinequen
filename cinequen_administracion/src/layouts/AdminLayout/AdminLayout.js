import React from 'react';
import "./AdminLayout.scss";
import { LoginAdmin } from "../../pages/Admin"

export function AdminLayout(props) {
    const { children } = props;
    const auth = null;

    if (!auth) return <LoginAdmin />

    return (
        <div>
            <h2>AdminLayout</h2>

            {children}
        </div>
    )
}
