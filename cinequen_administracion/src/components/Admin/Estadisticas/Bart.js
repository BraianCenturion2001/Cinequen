import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { useCharts } from "../../../hooks"
import { BarChart } from '@mui/x-charts';

export function Bart() {
    const { loading, dataBarts, getBarts } = useCharts();

    useEffect(() => {
        getBarts();
    }, [])

    const chartSetting = {
        yAxis: [
            {
                label: 'Entradas',
            },
        ],
        height: 300,
    };

    const valueFormatter = (value) => `${value} entradas`;
    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <BarChart
                        dataset={dataBarts.taquilla}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={dataBarts.series.map((seriesObj) => ({
                            ...seriesObj,
                            valueFormatter,
                        }))}
                        {...chartSetting}
                    />
                )
            }
        </>
    )
}
