import { ClientLayout } from "../layouts";
import { Home, Compras } from "../pages/Client";

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
];

export default routesClient;