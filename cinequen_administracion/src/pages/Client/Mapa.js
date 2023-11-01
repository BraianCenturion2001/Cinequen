import React from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
    width: '90%',
    height: '500px',
    margin: '0 auto'
};

const center = {
    lat: -38.9516,
    lng: -68.0591,
};

const libraries = ['places'];

export function Mapa() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBV5_LGEUMJT_B9eOLpPXsEOrYy6qj8kOE",
        libraries
    });

    return (
        <>
            {!isLoaded ? (
                <h1>Cargando mapita uwu...</h1>
            ) : (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                />
            )}
        </>
    )
}

