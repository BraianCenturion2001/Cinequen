import React, { useState, useEffect } from 'react'
import { BASE_REACT } from "../../../utils/constants"
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { MERCADO_PAGO_API_KEY } from "../../../utils/constants"
import { useEntrada } from "../../../hooks"
import { QRCode } from 'react-qrcode-logo';
import { useNavigate } from "react-router-dom";

initMercadoPago(MERCADO_PAGO_API_KEY, { locale: 'es-AR' });

export function Paso3Pago(props) {
    const { precioEntradas, handleComprar } = props;
    const navigate = useNavigate();
    const { generarPDF } = useEntrada();
    const [showQRCode, setShowQRCode] = useState(false);
    const [qrValue, setQRValue] = useState('');

    const handleGenerarPDF = async () => {
        try {
            await generarPDF();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (showQRCode) {
            setTimeout(() => {
                handleGenerarPDF();
                navigate('/mis-entradas');
            }, 3000);
        }
    }, [showQRCode]);

    const initialization = {
        amount: precioEntradas,
        installments: 1, // Establecer una sola cuota
    };
    const customization = {
        paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        try {
            const qrValue = await handleComprar();
            setQRValue(qrValue);
            setShowQRCode(true);
        } catch (error) {
            console.error(error);
        }
    };
    const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
    };

    return (
        <>
            <h2>Monto a pagar: ${precioEntradas}</h2>
            <Payment
                initialization={initialization}
                customization={customization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />

            {showQRCode && (
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
            )}
        </>
    )
}
