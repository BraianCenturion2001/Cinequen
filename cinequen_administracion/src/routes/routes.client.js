import { ClientLayout, LoginRegisterClientLayout } from "../layouts";
import { Home, Compras, FuncionesPelicula, CompraEntradas, LoginRegister } from "../pages/Client";

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
    {
        path: "/register",
        layout: LoginRegisterClientLayout,
        component: LoginRegister,
    },
    {
        path: "/login",
        layout: LoginRegisterClientLayout,
        component: LoginRegister,
    },
];

export default routesClient;