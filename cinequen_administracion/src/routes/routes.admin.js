import { AdminLayout } from "../layouts";
import { HomeAdmin, UsersAdmin, FuncionesAdmin, PeliculasAdmin, EstablecimientosAdmin } from "../pages/Admin";

const routesAdmin = [
    {
        path: "/admin",
        layout: AdminLayout,
        component: HomeAdmin,
    },
    {
        path: "/admin/users",
        layout: AdminLayout,
        component: UsersAdmin,
    },
    {
        path: "/admin/funciones",
        layout: AdminLayout,
        component: FuncionesAdmin,
    },
    {
        path: "/admin/peliculas",
        layout: AdminLayout,
        component: PeliculasAdmin,
    },
    {
        path: "/admin/establecimientos",
        layout: AdminLayout,
        component: EstablecimientosAdmin,
    },
];

export default routesAdmin;