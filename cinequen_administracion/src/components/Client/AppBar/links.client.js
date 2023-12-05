const linksClient = [
    {
        pathname: "/",
        title: "Películas",
        icon: "fa-duotone fa-films"
    },
    {
        pathname: "/compras",
        title: "Productos de Canje",
        icon: "fa-duotone fa-popcorn"
    },
];

const linksLog = [
    {
        pathname: "/register",
        title: "Registrarse",
    },
    {
        pathname: "/login",
        title: "Iniciar Sesión",
    },
]

const settings = [
    { title: 'Mi Perfil', route: '/mi-perfil', cerrar: false, icon: 'fa-duotone fa-gear' },
    { title: 'Mis Canjes', route: '/mis-canjes', cerrar: false, icon: 'fa-duotone fa-right-left' },
    { title: 'Mis Entradas', route: '/mis-entradas', cerrar: false, icon: 'fa-duotone fa-ticket' },
    { title: 'Cerrar Sesión', route: '/', cerrar: true, icon: 'fa-duotone fa-door-open' },
];

export { linksClient, linksLog, settings };