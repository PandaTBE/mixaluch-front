import AboutPage from '../pages/AboutPage/AboutPage';
import CartPageSkeleton from './components/CartPageSkeleton/CartPageSkeleton';
import CatalogSkeleton from './components/CatalogPageSkeleton/CatalogSkeleton';
import ContactsPage from '../pages/ContactsPage/ContactsPage';
import HomePageSkeleton from './components/HomePageSkeleton/HomePageSkeleton';
import UserAccountPageSkeleton from './components/UserAccountPageSkeleton/UserAccountPageSkeleton';
import { generalReducerValues } from '../../slices/General/general';
import { useSelector } from 'react-redux';

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

    return <div>loading...</div>;
};

export default LoadingSkeleton;
