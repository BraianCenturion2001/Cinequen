import React from 'react';
import './ClientLayout.scss';
import { ClientAppBar } from '../../components/Client';

export function ClientLayout(props) {

    const { children } = props;

    return (
        <>
            <ClientAppBar />
            {children}
        </>
    )
}
