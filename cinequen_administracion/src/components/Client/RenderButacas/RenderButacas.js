import React, { useState, useEffect } from 'react'
import { useButacasFuncion } from "../../../hooks"
import { TemplateComun } from './TemplateComun';
import { TemplateMidway } from './TemplateMidway';
import { TemplateCenturion } from './TemplateCenturion';
import { Template4Buster } from './Template4Buster';
import { groupBy } from "lodash"

export function RenderButacas(props) {
    const { id, tipoSala, setButacasIds, butacasIds, cantidadEntradas } = props;
    const { loading: loadingButacas, butacasFuncion, getButacasFuncion, updateButacaFuncion } = useButacasFuncion();
    const [butacasOrdenadas, setButacasOrdenadas] = useState();

    useEffect(() => {
        getButacasFuncion(id)
    }, [])

    useEffect(() => {
        if (!loadingButacas) {
            // Ordenar butacas por fila y número
            const butacasOrdenadas = butacasFuncion.sort((a, b) => {
                if (a.butaca_data.fila < b.butaca_data.fila) return 1; // Cambio: invertir el orden de comparación
                if (a.butaca_data.fila > b.butaca_data.fila) return -1; // Cambio: invertir el orden de comparación
                return a.butaca_data.numero - b.butaca_data.numero;
            });
            setButacasOrdenadas(butacasOrdenadas);
        }
    }, [loadingButacas, butacasFuncion]);

    // Agrupar las butacas por fila
    const butacasPorFila = groupBy(butacasOrdenadas, 'butaca_data.fila');

    return (
        <>
            {tipoSala === 'Sala Común' && (
                <TemplateComun butacasPorFila={butacasPorFila} cantidadEntradas={cantidadEntradas} butacasIds={butacasIds} setButacasIds={setButacasIds} />
            )}
            {tipoSala === 'Sala Midway' && (
                <TemplateMidway butacasPorFila={butacasPorFila} cantidadEntradas={cantidadEntradas} butacasIds={butacasIds} setButacasIds={setButacasIds} />
            )}
            {tipoSala === 'Sala Centurión' && (
                <TemplateCenturion butacasPorFila={butacasPorFila} cantidadEntradas={cantidadEntradas} butacasIds={butacasIds} setButacasIds={setButacasIds} />
            )}
            {tipoSala === 'Sala 4-Buster' && (
                <Template4Buster butacasPorFila={butacasPorFila} cantidadEntradas={cantidadEntradas} butacasIds={butacasIds} setButacasIds={setButacasIds} />
            )}
        </>
    )
}
