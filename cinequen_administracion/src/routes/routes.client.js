import { ClientLayout } from "../layouts";
import { Home, Compras, FuncionesPelicula } from "../pages/Client";

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
];

export default routesClient;