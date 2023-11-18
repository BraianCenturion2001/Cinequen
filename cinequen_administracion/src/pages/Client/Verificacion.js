import React, { useEffect, useState } from 'react'
import { Loader } from "semantic-ui-react"
import { useParams } from 'react-router-dom';
import { useUser } from "../../hooks"
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Verificacion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { validateUser, loading } = useUser();
    const [retener, setRetener] = useState(true)

    useEffect(() => {
        validateUser(id)
    }, [])

    useEffect(() => {
        setInterval(() => {
            setRetener(false);
        }, 3000);
    }, [loading])

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <Box
            sx={{
                height: '200px',
                width: '250px',
                backgroundColor: 'white',
                borderRadius: 1,
                margin: '0 auto',
                marginTop: '25vh',
            }}
        >
            {
                retener ? (
                    <Loader active inline="centered" >
                        Verificando usuario...
                    </Loader>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item >
                            <Typography variant="h5" gutterBottom>
                                Verificación completada
                            </Typography>
                        </Grid>
                        <Grid item >
                            <Button
                                type="submit"
                                variant="outlined"
                                color="success"
                                fullWidth
                                onClick={navigateToLogin}
                            >
                                Ir a Log-In
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
        </Box >
    )
}
