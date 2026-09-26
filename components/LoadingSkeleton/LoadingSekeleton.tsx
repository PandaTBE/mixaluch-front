import AboutPage from '../pages/AboutPage/AboutPage';
import CartPageSkeleton from './components/CartPageSkeleton/CartPageSkeleton';
import CatalogSkeleton from './components/CatalogPageSkeleton/CatalogSkeleton';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import DeliveryPage from '../pages/DeliveryPage/DeliveryPage';
import HomePageSkeleton from './components/HomePageSkeleton/HomePageSkeleton';
import OrderingPageSkeleton from './components/OrderingPageSkeleton/OrderingPageSkeleton';
import UserAccountPageSkeleton from './components/UserAccountPageSkeleton/UserAccountPageSkeleton';
import OrdersPageSkeleton from './components/OrdersPageSkeleton/OrdersPageSkeleton';
import ProductInfoPageSkeleton from './components/ProductInfoPageSkeleton/ProdcutInfoPageSkeleton';
import OrderInfoPageSkeleton from './components/OrderInfoPageSkeleton/OrderInfoPageSkeleton';
import AuthPageSkeleton from './components/AuthPageSkeleton';
import KebabPage from '../pages/KebabPage/KebabPage';

const LoadingSkeleton = ({ url, fallback }: { url: string; fallback: JSX.Element }) => {
    const path = url.split(/[?#]/)[0].replace(/\/$/, '') || '/';

    if (path === '/') {
        return <HomePageSkeleton />;
    }

    if (path === '/catalog') {
        return <CatalogSkeleton />;
    }

    if (path === '/user-account') {
        return <UserAccountPageSkeleton />;
    }

    if (path === '/cart') {
        return <CartPageSkeleton />;
    }

    if (path === '/about') {
        return <AboutPage />;
    }

    if (path === '/contacts') {
        return <ContactsPage />;
    }

    if (path === '/delivery') {
        return <DeliveryPage />;
    }

    if (path === '/ordering') {
        return <OrderingPageSkeleton />;
    }

    if (path === '/orders') {
        return <OrdersPageSkeleton />;
    }

    if (/^\/catalog\/[^/]+$/.test(path)) {
        return <ProductInfoPageSkeleton />;
    }

    if (/^\/orders\/[^/]+$/.test(path)) return <OrderInfoPageSkeleton />;
    if (path === '/kebab') return <KebabPage />;
    if (
        ['/login', '/register', '/reset-password'].includes(path) ||
        /^\/(reset-password-confirm|activate)\/[^/]+\/[^/]+$/.test(path)
    ) {
        return <AuthPageSkeleton path={path} />;
    }

    return fallback;
};

export default LoadingSkeleton;
