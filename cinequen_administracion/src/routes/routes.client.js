import { ClientLayout, LoginRegisterClientLayout } from "../layouts";
import { Home, EntradasCliente, FuncionesPelicula, CompraEntradas, LoginRegister, Canjes, Perfil, Mapa, ProductosCanje, Verificacion } from "../pages/Client";

const routesClient = [
    {
        path: "/",
        layout: ClientLayout,
        component: Home,
    },
    {
        path: "/compras",
        layout: ClientLayout,
        component: ProductosCanje,
    },
    {
        path: "/mapa",
        layout: ClientLayout,
        component: Mapa,
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
        component: EntradasCliente,
    },
    {
        path: "/verificacion/:id",
        layout: ClientLayout,
        component: Verificacion,
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