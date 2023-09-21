import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
    auth: undefined,
    login: () => null,
    logout: () => null,
})

export function AuthProvider(props) {
    const { children } = props;

    const valueContext = {
        auth: null,
        login: () => console.log("Realizando Login"),
        logout: () => console.log("Cerrando sesion")
    }

    return (
        < AuthContext.Provider value={valueContext}>
            {children}
        </ AuthContext.Provider >
    )
}

