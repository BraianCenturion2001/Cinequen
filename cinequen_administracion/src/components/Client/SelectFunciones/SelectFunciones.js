import React, { useEffect, useState } from 'react'
import "./SelectFunciones.scss"
import { useEstablecimiento, usePeliculaEstablecimiento, usePelicula } from "../../../hooks"
import { Grid, Box, CircularProgress } from '@mui/material'
import { CardPelicula } from "../../../components/Client"
import { Dropdown } from 'semantic-ui-react';
import { map } from 'lodash';

export function SelectFunciones() {
    const [establecimientosFormato, setEstablecimientosFormato] = useState([]);
    const [peliculasOptions, setPeliculasOptions] = useState([]);

    const { establecimientos, getEstablecimientos } = useEstablecimiento();
    const { loading: loadingPeliculas, peliculas, getPeliculas } = usePelicula();
    const { loading: loadingPE, peliculasEstablecimientos, getPEFiltro1, getPeliculasEstablecimiento } = usePeliculaEstablecimiento();

    useEffect(() => {
        getEstablecimientos()
        getPeliculas()
    }, [])

    useEffect(() => {
        setEstablecimientosFormato(formatDropdownData(establecimientos))
    }, [establecimientos]);

    useEffect(() => {
        if (!loadingPeliculas) {
            setPeliculasOptions(peliculas)
        }
    }, [loadingPeliculas, peliculas]);

    useEffect(() => {
        if (!loadingPE) {
            const peliculasData = peliculasEstablecimientos.map((item) => item.pelicula_data);
            setPeliculasOptions(peliculasData);
        }
    }, [loadingPE, peliculasEstablecimientos]);

    const handleEstablecimientoChange = async (event, data) => {
        setPeliculasOptions([]);
        try {
            await getPeliculasEstablecimiento({ establecimiento: data.value });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Box sx={{ width: '250px', margin: '30px' }}>
                <Dropdown
                    placeholder='Seleccione un Establecimiento'
                    fluid selection search
                    options={establecimientosFormato}
                    onChange={handleEstablecimientoChange}
                />
            </Box>

            {
                loadingPeliculas ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <Box sx={{ margin: '0 40px' }}>
                        <Grid container spacing={12}>
                            {peliculasOptions.map((pelicula) => (
                                <Grid item xs={3} sm={3} md={3} lg={3} xl={3} key={pelicula.id}>
                                    <CardPelicula pelicula={pelicula} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )
            }
        </>
    )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.nombre,
        value: item.id
    }));
}