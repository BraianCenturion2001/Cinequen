import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

export function Footer() {
    const linkStyles = {
        textDecoration: 'none',
        color: 'inherit',
    };
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    bottom: 0,
                    left: 0,
                    marginTop: '2rem',
                    background: 'rgb(0, 0, 0)',
                    background: '-moz-linear-gradient(0deg, rgba(0, 0, 0, 1) 54%, rgba(182, 10, 10, 1) 97%)',
                    background: '-webkit-linear-gradient(0deg, rgba(0, 0, 0, 1) 54%, rgba(182, 10, 10, 1) 97%)',
                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 1) 54%, rgba(182, 10, 10, 1) 97%)',
                    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#b60a0a",GradientType=1)',
                    color: 'white',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1" fontWeight="bold" textAlign="center" textTransform="uppercase">
                                QUIENES SOMOS?
                            </Typography>
                            <Box textAlign="center">
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Nuestra historia</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Términos y Condiciones</Link>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1" fontWeight="bold" textAlign="center" textTransform="uppercase">
                                NUESTROS PRECIOS
                            </Typography>
                            <Box textAlign="center">
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Precios de entradas</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Precios de productos</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Precios de productos</Link>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1" fontWeight="bold" textAlign="center" textTransform="uppercase">
                                INFORMACIÓN
                            </Typography>
                            <Box textAlign="center">
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Festeja tu cumple</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Promos vigentes</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Calificaciones</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Ventas corporativas</Link>
                                </div>
                                <div>
                                    <Link href="#" style={linkStyles}><i class="fa-duotone fa-chevron-right" style={{ marginRight: "8px" }}></i>Contáctanos</Link>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'black',
                    color: 'white',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                {`© ${new Date().getFullYear()} Cinequén`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
