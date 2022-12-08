import { useSelector } from 'react-redux';
import { generalReducerValues } from '../../slices/General/general';
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

    return <div>loading...</div>;
};

export default LoadingSkeleton;
