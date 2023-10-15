import React from 'react';
import "./TopMenu.scss";
import { usePopover } from "../../../hooks";
import { AppBar, Toolbar, Typography, Avatar } from "@mui/material"
import { alpha } from '@mui/material/styles';
import { AccountPopover } from './account-popover.js';

export function TopMenu() {
    const accountPopover = usePopover();

    const SIDE_NAV_WIDTH = 219;
    const TOP_NAV_HEIGHT = 64;

    return (
        <AppBar sx={{
            position: 'sticky',
            left: {
                lg: `${SIDE_NAV_WIDTH}px`
            },
            top: 0,
            width: {
                lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
            },
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: alpha('#000000', 0.8),
            height: TOP_NAV_HEIGHT,
            px: 2
        }}>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Avatar
                    onClick={accountPopover.handleOpen}
                    ref={accountPopover.anchorRef}
                    size="sm"
                    sx={{
                        cursor: 'pointer',
                    }}
                />
            </Toolbar>
            <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
            />
        </AppBar>
    )
}
