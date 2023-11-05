import React from 'react';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../utils/constants"

const mapContainerStyle = {
    width: '90%',
    height: '500px',
    margin: '15px auto'
};

const center = {
    lat: -38.9516,
    lng: -68.0591,
};

export function Mapa() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    return (
        <>
            {!isLoaded ? (
                <h1>Cargando mapita uwu...</h1>
            ) : (
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={15}
                />
            )}
        </>
    )
}

