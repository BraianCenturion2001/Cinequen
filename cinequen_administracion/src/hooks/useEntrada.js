import React, { useState } from "react";
import { getEntradasApi, insertEntradaApi } from "../api/entradas";
import { useAuth } from ".";
import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import QRCodeLogo from 'react-qrcode-logo';
import { saveAs } from 'file-saver';


export function useEntrada() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [entradas, setEntradas] = useState(null);
    const { auth } = useAuth();

    const getEntradas = async (params) => {
        try {
            setLoading(true)
            const response = await getEntradasApi(params);
            setEntradas(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error)
        }
    };

    const insertEntrada = async (data) => {
        try {
            const requestData = { ...data, user: auth.me.user_data.id };
            setLoading(true);
            const response = await insertEntradaApi(requestData, auth.token);
            console.log(response.qr_value);
            generarPDF(response.qr_value);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const generarPDF = (qrValue) => {
        console.log("INICIO")
        const qrCode = new QRCodeLogo({
            text: qrValue,
            logo: 'images/Icon 2.png',
            logoWidth: 80,
            logoHeight: 80,
        });

        console.log("after qr")

        const qrImage = qrCode.toDataURL();

        console.log("after qr imagen")
        const MyDocument = () => (
            <Document>
                <Page>
                    <View>
                        <Text>QR Code:</Text>
                        <Image src={qrImage} />
                    </View>
                </Page>
            </Document>
        );

        console.log("after documento")

        const fileName = 'entrada.pdf';

        const handleDownload = () => {
            console.log("descarga")
            const blob = MyDocument().toBlob();
            saveAs(blob, fileName);
        };

        console.log("antes de hacer descarga")
        handleDownload();
        console.log("despues de hacer descarga")

        return null;
    };

    return {
        loading,
        error,
        entradas,
        getEntradas,
        insertEntrada,

    };
}