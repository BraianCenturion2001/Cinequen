import React, { useState, useEffect } from 'react';
import { Dropdown } from "semantic-ui-react";
import { Grid, Chip } from '@mui/material';
import { map, filter } from "lodash";


export function RenderGeneros(props) {
    const { generos, setGeneros } = props;
    const [generoChipData, setGeneroChipData] = useState([]);
    const [condicion, setCondicion] = useState(true);
    const [generoOptions, setGeneroOptions] = useState([
        { key: '1', value: 'Aventura', text: 'Aventura' },
        { key: '2', value: 'Terror', text: 'Terror' },
        { key: '3', value: 'Acción', text: 'Acción' },
        { key: '4', value: 'Romance', text: 'Romance' },
        { key: '5', value: 'Drama', text: 'Drama' },
        { key: '6', value: 'Ciencia Ficción', text: 'Ciencia Ficción' },
        { key: '7', value: 'Thriller', text: 'Thriller' },
        { key: '8', value: 'Suspenso', text: 'Suspenso' },
    ]);

    useEffect(() => {
        if (condicion) {
            if (generos) {
                const generosArray = map(generos.split(','), genero => genero.trim());
                const generosData = map(generosArray, (genero, index) => ({
                    key: (index + 1).toString(),
                    value: genero,
                    text: genero
                }));
                setGeneroChipData(generosData);
                setCondicion(false)
            }
        }
    }, [generos, generoOptions, condicion]);

    useEffect(() => {
        const generosString = map(generoChipData, data => data.value).join(", ");
        setGeneros(generosString);
    }, [generoChipData, setGeneros]);

    const handleDelete = (chipToDelete) => () => {
        setGeneroChipData((chips) => filter(chips, chip => chip.value !== chipToDelete.value));
    };

    const actualizarChips = (event, data) => {
        const selectedOption = generoChipData.find(option => option.value === data.value);
        if (selectedOption === undefined) {
            const newOption = {
                key: (generoChipData.length + 1).toString(),
                value: data.value,
                text: data.value
            };
            setGeneroChipData(generoChipData => [...generoChipData, newOption]);
        }
    };

    return (
        <>
            <Grid
                container
                spacing={1}
                sx={{
                    justifyContent: 'center',
                    p: 0.5,
                    m: 0,
                    marginBottom: '1rem',
                }}
            >
                {map(generoChipData, (data) => {
                    let icon;
                    return (
                        <Grid item key={data.key}>
                            <Chip
                                sx={{ marginRight: '0.5rem' }}
                                key={data.key}
                                icon={icon}
                                label={data.text}
                                onDelete={handleDelete(data)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Dropdown
                style={{ marginBottom: '15px' }}
                placeholder='Géneros'
                fluid
                selection
                search
                options={generoOptions}
                onChange={actualizarChips}
            />
        </>
    );
}