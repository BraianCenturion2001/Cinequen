import React from 'react';
import { Container, AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Button, Tooltip } from '@mui/material';
import { useAuth, usePopover } from "../../../hooks";
import { Link, useNavigate } from "react-router-dom"
import { linksClient, linksLog, settings } from "./links.client"
import { Image } from "semantic-ui-react"
import { BASE_REACT } from "../../../utils/constants"
import { map } from "lodash";
import "./AppBar.scss";

export function ClientAppBar() {
    const { auth, logout } = useAuth();
    console.log(auth)
    const accountPopover = usePopover();
    const navigate = useNavigate();

    const handleLinkClick = (route, logout) => {
        if (!logout) {
            navigate(route);
        }
    };

    const handleLogout = () => {
        logout(); // Llama a la función de cierre de sesión del contexto de autenticación
    };

    const renderAuthLinks = () => {
        return (
            <>
                <Tooltip title="Ver Opciones">
                    <IconButton sx={{ p: 0 }}>
                        <Avatar
                            onClick={accountPopover.handleOpen}
                            ref={accountPopover.anchorRef}
                            size="sm"
                            sx={{
                                cursor: 'pointer',
                            }}
                        />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={accountPopover.anchorRef.current}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={accountPopover.open}
                    onClose={accountPopover.handleClose}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting.title} onClick={setting.logout ? () => handleLinkClick(setting.route, setting.logout) : handleLogout}>
                            <Typography textAlign="center">
                                <i className={setting.icon} style={{ marginRight: '8px' }}></i>
                                {setting.title}
                            </Typography>
                        </MenuItem>
                    ))}

                </Menu>
            </>
        );
    };

    const renderNonAuthLinks = () => {
        return (
            <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                {map(linksLog, (link, index) => (
                    <Button
                        key={index}
                        component={Link}
                        to={link.pathname}
                        sx={{ my: 2, color: 'white', display: 'block', textTransform: 'uppercase', fontSize: '1.2rem' }}
                    >
                        {link.title}
                    </Button>
                ))}
            </Box>
        );
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, display: { md: 'flex' }, marginRight: '20px' }}>
                        <Image src={`${BASE_REACT}/images/Logo 2.png`} size="small" />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
                        {map(linksClient, (link, index) => (
                            <Button
                                key={index}
                                component={Link}
                                to={link.pathname}
                                sx={{ my: 2, color: 'white', display: 'block', textTransform: 'uppercase', fontSize: '1.2rem' }}
                            >
                                {link.title}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {auth ? renderAuthLinks() : renderNonAuthLinks()}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}