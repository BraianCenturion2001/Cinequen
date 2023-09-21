import React from 'react';
import "./TopMenu.scss";
import { useAuth } from "../../../hooks";
import { Icon, Menu } from "semantic-ui-react";

export function TopMenu() {
    const { auth, logout } = useAuth();

    const renderName = () => {
        if (auth.me?.first_name && auth.me?.last_name) {
            return `${auth.me.first_name} ${auth.me.last_name}`
        }

        return auth.me?.email;
    }

    return (
        <Menu fixed='top' className='top-menu-admin'>
            <Menu.Item className='top-menu-admin__logo'>
                <p>Cinequen Admin</p>
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>Hola, {renderName()}</Menu.Item>
                <Menu.Item onClick={logout}>
                    <Icon name='sign-out' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
