import React, { useEffect } from "react";
import { SelectFunciones, CarouselHome } from "../../components/Client";

export function Home() {
    useEffect(() => {
        document.title = 'Cinequén Inicio';
    }, []);
    return (
        <>
            <CarouselHome />
            <SelectFunciones />
        </>
    );
}
