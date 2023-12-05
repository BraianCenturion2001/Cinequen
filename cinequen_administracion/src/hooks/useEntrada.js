import React, { useState } from "react";
import { getEntradasApi, insertEntradaApi } from "../api/entradas";
import { useAuth } from ".";
import { Document, Page, Text, View, Image, pdf, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';


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
            setLoading(false);
            return response.qr_value;
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const styles = StyleSheet.create({
        container: {
            width: 450,
            height: '100%',
            margin: '0 auto',
            backgroundColor: '#440000',
            color: 'white',
        },
        subcontainer: {
            width: 400,
            height: '100%',
            margin: '0 auto',
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: '#940000',
            borderRadius: 15,
        },
        title: {
            margin: '0 auto',
            marginTop: '30px',
            marginBottom: '50px',
            color: "white",
        },
        image: {
            margin: '0 auto',
            height: 200,
            width: 200,
        }

    });

    const generarPDF = async () => {
        try {
            const convertToBase64 = async () => {
                const canvas = document.getElementById('QRCodePDF');
                const img = await html2canvas(canvas);
                const imgData = img.toDataURL('image/jpg');
                return imgData;
            };

            const imgData = await convertToBase64();

            const MyDocument = (
                <Document>
                    <Page>
                        <View style={styles.container}>
                            <View style={styles.subcontainer}>
                                <Text style={styles.title}>QR Entrada:</Text>
                                <Image src={imgData} style={styles.image} />
                            </View>
                        </View>
                    </Page>
                </Document>
            );

            const pdfBlob = await pdf(MyDocument).toBlob();
            saveAs(pdfBlob, 'entrada.pdf');
        } catch (error) {
            console.error(error);
        }
    };

    return {
        loading,
        error,
        entradas,
        getEntradas,
        insertEntrada,
        generarPDF,

    };
}