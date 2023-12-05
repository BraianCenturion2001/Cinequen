import React, { useEffect } from 'react'
import { BASE_REACT } from "../../../utils/constants"
import { QRCode } from 'react-qrcode-logo';
import { useEntrada } from "../../../hooks";
import { Box, Typography } from '@mui/material';

export function Paso4QR(props) {
    const { qrValue, setIsDisabledQR } = props;
    const { generarPDF } = useEntrada();

    const handleGenerarPDF = async () => {
        try {
            await generarPDF();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            handleGenerarPDF();
        }, 1500);
        setIsDisabledQR(false);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '400px',
            }}
        >
            <Typography variant="h5" color="textPrimary" gutterBottom>
                En breve se descargará este QR!
            </Typography>
            <QRCode
                value={qrValue}
                enableCORS={true}
                logoImage={BASE_REACT + '/images/Icon 1.png'}
                removeQrCodeBehindLogo={true}
                size={250}
                eyeColor='#cc1212'
                fgColor='#cc1212'
                qrStyle="dots"
                eyeRadius={[
                    [10, 10, 0, 10],
                    [10, 10, 10, 0], // top/right eye
                    [10, 0, 10, 10], // bottom/left
                ]}
                id={'QRCodePDF'}
            />
        </Box>
    )
}
