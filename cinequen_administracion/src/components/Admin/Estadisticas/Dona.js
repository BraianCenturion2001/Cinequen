import React, { useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import { useCharts } from "../../../hooks"
import { PieChart } from '@mui/x-charts';

export function Dona() {
    const { loading, dataDona, getDona } = useCharts();

    useEffect(() => {
        getDona();
    }, [])


    const size = {
        width: 500,
        height: 400,
    };

    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <PieChart
                        series={[
                            {
                                data: dataDona,
                                innerRadius: 25,
                                outerRadius: 100,
                                paddingAngle: 1,
                                cornerRadius: 5,
                                startAngle: 0,
                                endAngle: 360,
                                cx: 150,
                                cy: 150,
                            }
                        ]}
                        {...size}
                    />
                )
            }
        </>
    )
}
