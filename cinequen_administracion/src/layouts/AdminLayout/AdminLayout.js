import React from 'react';
import "./AdminLayout.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks"
import { TopMenu, SideBar } from "../../components/Admin"
import { CssBaseline } from "@mui/material"
import { styled } from '@mui/material/styles';

export function AdminLayout(props) {
    const navigate = useNavigate();
    const { auth } = useAuth();

    if (!auth) {
        navigate('/admin/login');
        return null;
    }

    const { children } = props;

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
