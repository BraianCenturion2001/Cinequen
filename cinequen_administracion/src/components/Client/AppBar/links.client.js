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
    { title: 'Mi Perfil', route: '/mi-perfil', cerrar: false, icon: 'fa-duotone fa-gear' },
    { title: 'Mis Canjes', route: '/mis-canjes', cerrar: false, icon: 'fa-duotone fa-right-left' },
    { title: 'Mis Entradas', route: '/mis-entradas', cerrar: false, icon: 'fa-duotone fa-ticket' },
    { title: 'Cerrar Sesión', route: '/', cerrar: true, icon: 'fa-duotone fa-door-open' },
];

export { linksClient, linksLog, settings };