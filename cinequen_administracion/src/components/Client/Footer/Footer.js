import React from 'react'
import { Box, Container, Grid, Typography } from "@mui/material";

export function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                bottom: 0,
                left: 0,
                marginTop: '2rem',
                backgroundColor: "black",
                color: 'white',
                paddingTop: "1rem",
                paddingBottom: "1rem",
            }}
        >
            <Container maxWidth="lg">
                <Grid container direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="h5">
                            React App
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" variant="subtitle1">
                            {`© ${new Date().getFullYear()} Cinequén`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
