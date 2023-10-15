import React from 'react';
import "./AdminLayout.scss";
import { LoginAdmin } from "../../pages/Admin"
import { useAuth } from "../../hooks"
import { TopMenu, SideBar } from "../../components/Admin"
import { Box, CssBaseline, Toolbar } from "@mui/material"
import { styled } from '@mui/material/styles';

export function AdminLayout(props) {
    const { children } = props;
    const { auth } = useAuth();

    const AdminLayoutRoot = styled('div')(({ theme }) => ({
        display: 'flex',
        flex: '1 1 auto',
        maxWidth: '100%',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 220
        }
    }));

    const AdminLayoutContainer = styled('div')(({ theme }) => ({
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(4)
    }));


    if (!auth) return <LoginAdmin />

    return (
        <>
            <CssBaseline />

            <TopMenu />

            <SideBar />

            <AdminLayoutRoot>
                <AdminLayoutContainer>
                    {children}
                </AdminLayoutContainer>
            </AdminLayoutRoot>
        </>
    )
}
