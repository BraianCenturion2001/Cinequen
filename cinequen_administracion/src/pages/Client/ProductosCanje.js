import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { Loader } from "semantic-ui-react"
import { useProductoCanje, useAuth, useCanjes } from "../../hooks"
import { map } from "lodash"
import { toast } from 'react-toastify';

export function ProductosCanje() {
    const { loading: loadingProductos, productos, getProductosCanje } = useProductoCanje()
    const { loading: loadingCanje, addCanje } = useCanjes();
    const [resultado, setResultado] = useState(null)
    const { auth } = useAuth();

    useEffect(() => {
        getProductosCanje();
    }, [])

    const canjearProducto = async (idProducto, precioPuntos) => {
        if (auth?.me !== undefined) {
            if (auth.me.puntos < precioPuntos) {
                toast.error('Puntos insuficientes!');
            } else {
                const canjeData = {
                    producto: idProducto,
                    puntos_restados: precioPuntos,
                    cliente: auth.me.user_id,
                };

                var resultado_canje = await addCanje(canjeData);
                setResultado(resultado_canje)
            }
        } else {
            toast.error('Para canjear productos debes iniciar sesión!');
        }
    };

    useEffect(() => {
        if (!loadingCanje) {
            if (resultado !== 201) {
                toast.error('Puntos insuficientes!')
            } else {
                toast.success('Canje realizado con éxito!')
            }
        }
    }, [loadingCanje, resultado])

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
                loadingProductos ? (
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
