import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Loader } from "semantic-ui-react"
import { useProductoCanje, useAuth } from "../../hooks"
import { map } from "lodash"
import { toast } from 'react-toastify';

export function ProductosCanje() {
    const { loading, productos, getProductosCanje } = useProductoCanje()
    const { auth } = useAuth();
    const [botonCanje, setBotonCanje] = useState(null);
    const [condicion, setCondicion] = useState(false);

    useEffect(() => {
        getProductosCanje();
    }, [])

    const canjearProducto = (idProducto, precioPuntos) => {
        if (auth?.me !== undefined) {
            if (auth.me.puntos < precioPuntos) {
                toast.error('Puntos insuficientes!');
            } else {
                /* accion de canjear */
            }
        } else {
            toast.error('Para canjear productos debes iniciar sesión!');
        }
    };

    const renderCards = () => {
        return map(productos, (producto, index) => (
            <Card key={index} sx={{ maxWidth: 345, marginBottom: 10, marginLeft: 5, marginRight: 5 }}>
                <CardMedia
                    component="img"
                    alt={producto.nombre}
                    height="140"
                    image={producto.imagen}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {producto.nombre}
                    </Typography>
                    <Typography variant="h5">
                        <i className="fa-duotone fa-ticket" style={{
                            marginRight: '8px',
                            '--fa-primary-color': '#0f0f0f',
                            '--fa-secondary-color': '#e31616',
                            '--fa-secondary-opacity': 0.8
                        }}></i>{producto.precio_puntos}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {producto.descripcion}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => canjearProducto(producto.id, producto.precio_puntos)} type="submit" variant="outlined" color="error" fullWidth >
                        Canjear Producto
                    </Button>
                </CardActions>
            </Card>
        ));
    };
    return (
        <>
            {
                loading ? (
                    <Loader active inline="centered" >
                        Cargando
                    </Loader>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '25px' }}>
                        {renderCards()}
                    </div>
                )
            }
        </>
    )
}
