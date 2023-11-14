import React from 'react';
import './ClientLayout.scss';
import { ClientAppBar } from '../../components/Client';

export function ClientLayout(props) {

    const { children } = props;

    return (
        <div className='container-client'>
            <ClientAppBar />
            {children}
        </div>
    )
}
