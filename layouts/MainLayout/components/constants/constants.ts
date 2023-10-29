export const navigationListItems = [
    {
        id: 'catalog',
        href: '/catalog',
        name: 'Каталог',
        isActive: (pathname: string, href: string) => defaultCompare(pathname, href),
    },
    {
        id: 'about',
        href: '/about',
        name: 'О компании',
        isActive: (pathname: string, href: string) => defaultCompare(pathname, href),
    },
    {
        id: 'contacts',
        href: '/contacts',
        name: 'Контакты',
        isActive: (pathname: string, href: string) => defaultCompare(pathname, href),
    },
    {
        id: 'delivery',
        href: '/delivery',
        name: 'Доставка',
        isActive: (pathname: string, href: string) => defaultCompare(pathname, href),
    },
    {
        id: 'user-account',
        href: '/user-account',
        name: 'Личный кабинет',
        isActive: (pathname: string, href: string) => defaultCompare(pathname, href),
    },
];

const defaultCompare = (pathname: string, href: string) => pathname === href;
