import AboutPage from '../pages/AboutPage/AboutPage';
import CartPageSkeleton from './components/CartPageSkeleton/CartPageSkeleton';
import CatalogSkeleton from './components/CatalogPageSkeleton/CatalogSkeleton';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import DeliveryPage from '../pages/DeliveryPage/DeliveryPage';
import HomePageSkeleton from './components/HomePageSkeleton/HomePageSkeleton';
import OrderingPageSkeleton from './components/OrderingPageSkeleton/OrderingPageSkeleton';
import UserAccountPageSkeleton from './components/UserAccountPageSkeleton/UserAccountPageSkeleton';
import { generalReducerValues } from '../../slices/General/general';
import { useSelector } from 'react-redux';
import OrdersPageSkeleton from './components/OrdersPageSkeleton/OrdersPageSkeleton';

const LoadingSkeleton = () => {
    const { pageToSwitch } = useSelector(generalReducerValues);

    if (pageToSwitch === '/') {
        return <HomePageSkeleton />;
    }

    if (pageToSwitch === '/catalog') {
        return <CatalogSkeleton />;
    }

    if (pageToSwitch === '/user-account') {
        return <UserAccountPageSkeleton />;
    }

    if (pageToSwitch === '/cart') {
        return <CartPageSkeleton />;
    }

    if (pageToSwitch === '/about') {
        return <AboutPage />;
    }

    if (pageToSwitch === '/contacts') {
        return <ContactsPage />;
    }

    if (pageToSwitch === '/delivery') {
        return <DeliveryPage />;
    }

    if (pageToSwitch === '/ordering') {
        return <OrderingPageSkeleton />;
    }

    if (pageToSwitch === '/orders') {
        return <OrdersPageSkeleton />;
    }

    return <div>Loading...</div>;
};

export default LoadingSkeleton;
