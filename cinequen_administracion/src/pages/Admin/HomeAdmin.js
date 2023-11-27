import React from 'react';
import { Grid } from '@mui/material';
import { Bart, Dona, Lines } from "../../components/Admin";

export function HomeAdmin() {
    return (
        <div>
            <h2>Escritorio</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Bart />
                </Grid>
                <Grid item xs={5}>
                    <Dona />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={5}>
                    <Lines />
                </Grid>
            </Grid>
        </div>
    )
}