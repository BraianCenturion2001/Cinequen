import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { useCharts } from "../../../hooks"
import { LineChart } from '@mui/x-charts';
import { Typography } from "@mui/material"

export function Lines() {
    const { loading, dataLines, getLines } = useCharts();

    useEffect(() => {
        getLines();
    }, [])

    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>Linea Rendimiento Anual</Typography>
                        <LineChart
                            xAxis={[{
                                data: [0,
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    10,
                                    11]
                            }]}
                            series={[
                                {
                                    data: dataLines,
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </>
                )
            }
        </>
    )
}
