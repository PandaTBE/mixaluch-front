import { useSelector } from 'react-redux';
import { generalReducerValues } from '../../slices/General/general';
import AboutPage from '../pages/AboutPage/AboutPage';
import CartPageSkeleton from './components/CartPageSkeleton/CartPageSkeleton';
import CatalogSkeleton from './components/CatalogPageSkeleton/CatalogSkeleton';
import HomePageSkeleton from './components/HomePageSkeleton/HomePageSkeleton';
import UserAccountPageSkeleton from './components/UserAccountPageSkeleton/UserAccountPageSkeleton';

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

    return <div>loading...</div>;
};

export default LoadingSkeleton;
