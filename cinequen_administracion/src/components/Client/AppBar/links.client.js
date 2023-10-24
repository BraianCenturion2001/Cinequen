const linksClient = [
    {
        pathname: "/",
        title: "Inicio",
    },
    /* {
        pathname: "/compras",
        title: "Compras",
    }, */
];

const linksLog = [
    {
        pathname: "/register",
        title: "Registro",
    },
    {
        pathname: "/login",
        title: "Log In",
    },
]

const settings = [
    { title: 'Mi Perfil', route: '/mi-perfil', icon: 'fa-duotone fa-gear' },
    { title: 'Mis Canjes', route: '/mis-canjes', icon: 'fa-duotone fa-right-left' },
    { title: 'Mis Entradas', route: '/mis-entradas', icon: 'fa-duotone fa-ticket' },
    { title: 'Cerrar Sesión', logout: true, icon: 'fa-duotone fa-door-open' },
];

export { linksClient, linksLog, settings };