import { ClientLayout, LoginRegisterClientLayout } from "../layouts";
import { Home, Compras, FuncionesPelicula, CompraEntradas, LoginRegister, Canjes, Perfil } from "../pages/Client";

const routesClient = [
    {
        path: "/",
        layout: ClientLayout,
        component: Home,
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
        path: "/mi-perfil",
        layout: ClientLayout,
        component: Perfil,
    },
    {
        path: "/mis-canjes",
        layout: ClientLayout,
        component: Canjes,
    },
    {
        path: "/mis-entradas",
        layout: ClientLayout,
        component: Compras,
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