import { ClientLayout } from "../layouts";
import { Home, Compras, FuncionesPelicula, CompraEntradas } from "../pages/Client";

const routesClient = [
    {
        path: "/",
        layout: ClientLayout,
        component: Home,
    },
    {
        path: "/compras",
        layout: ClientLayout,
        component: Compras,
    },
    {
        path: "/funciones/pelicula/:id",
        layout: ClientLayout,
        component: FuncionesPelicula,
    },
    {
        path: "/funcion/compra/:id",
        layout: ClientLayout,
        component: CompraEntradas,
    },
];

export default routesClient;