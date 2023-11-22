import React, { useState, useEffect } from 'react'
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
    const [isDisabled, setIsDisabled] = useState(true);
    const steps = ['Indica cantidad de Entradas', 'Selecciona tus Butacas', 'Método de Pago'];

    const handleNext = () => {
        if (activeStep === 0 && cantidadEntradas <= 0) {
            // No se puede avanzar si la cantidad de entradas es menor o igual a 0
            return;
        }
        if (activeStep === 1 && butacasIds.length < cantidadEntradas) {
            // No se puede avanzar si la cantidad de butacas seleccionadas no coincide con la cantidad de entradas
            return;
        }
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


    useEffect(() => {
        if (activeStep === 0 && cantidadEntradas <= 0) {
            setIsDisabled(true);
        } else if (activeStep === 1 && butacasIds.length < cantidadEntradas) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }


    }, [cantidadEntradas, butacasIds, activeStep]);


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
                    <Button onClick={handleNext} disabled={isDisabled}>
                        <i className="fa-duotone fa-forward" style={{ marginRight: '15px' }}></i> Siguiente
                    </Button>
                )}
            </Box>
        </Box>
    );
}
