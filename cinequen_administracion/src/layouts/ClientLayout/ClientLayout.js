import React from 'react';
import './ClientLayout.scss';
import { ClientAppBar, Footer } from '../../components/Client';

export function ClientLayout(props) {

    const { children } = props;

    return (
        <div className='container-client'>
            <ClientAppBar />
            {children}
            <Footer />
        </div>
    )
}
