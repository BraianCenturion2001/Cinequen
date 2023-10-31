import React, { useState } from 'react'
import { useEntrada } from "../../../hooks"
import "./FormCompraEntradas.scss"
import { Paso1Entradas } from './Paso1Entradas';
import { Paso2Butacas } from './Paso2Butacas';
import { Paso3Pago } from './Paso3Pago';
import { Box, Stepper, Typography, Step, StepLabel, Button } from '@mui/material';

export function FormCompraEntradas(props) {
    const { funcion } = props;
    const { insertEntrada } = useEntrada();
    const [cantidadEntradas, setCantidadEntradas] = useState(0);
    const [precioEntradas, setPrecioEntradas] = useState(0);
    const [butacasIds, setButacasIds] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Indica cantidad de Entradas', 'Selecciona tus Butacas', 'Método de Pago'];

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleComprar = () => {
        const idsButacasString = butacasIds.join(','); // Convertir el arreglo en una cadena separada por comas
        insertEntrada({ 'idsButacasxFuncion': idsButacasString, 'tipo_sala': funcion.sala_data.tipo });
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Paso1Entradas
                        cantidadEntradas={cantidadEntradas}
                        setCantidadEntradas={setCantidadEntradas}
                        precioEntradas={precioEntradas}
                        setPrecioEntradas={setPrecioEntradas}
                        funcion={funcion}
                    />
                );
            case 1:
                return (
                    <Paso2Butacas
                        cantidadEntradas={cantidadEntradas}
                        setCantidadEntradas={setCantidadEntradas}
                        butacasIds={butacasIds}
                        setButacasIds={setButacasIds}
                        funcion={funcion}
                    />
                );
            case 2:
                return (
                    <Paso3Pago
                        precioEntradas={precioEntradas}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '90%', margin: '30px auto' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 2, mb: 1 }}>
                {activeStep === steps.length ? (
                    <Typography>Todos los pasos fueron finalizados.</Typography>
                ) : (
                    <Typography>Paso {activeStep + 1}</Typography>
                )}
            </Box>
            <Box sx={{ margin: '30px 0' }}>
                {getStepContent(activeStep)}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Volver
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleComprar}>Finalizar</Button>
                ) : (
                    <Button onClick={handleNext}>Siguiente</Button>
                )}
            </Box>
        </Box>
    );
}
