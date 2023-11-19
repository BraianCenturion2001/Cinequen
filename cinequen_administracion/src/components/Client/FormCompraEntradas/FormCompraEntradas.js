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
        const idsButacasString = butacasIds.join(',');
        return insertEntrada({ 'idsButacasxFuncion': idsButacasString, 'tipo_sala': funcion.sala_data.tipo });
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
                        handleComprar={handleComprar}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '95%', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1, mt: '20px', mb: '20px', padding: '30px' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ margin: '30px 0' }}>
                {getStepContent(activeStep)}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    <i class="fa-duotone fa-backward" style={{ marginRight: '15px' }}></i> Volver
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {activeStep < steps.length - 1 && (
                    <Button onClick={handleNext}>
                        <i className="fa-duotone fa-forward" style={{ marginRight: '15px' }}></i> Siguiente
                    </Button>
                )}
            </Box>
        </Box>
    );
}
