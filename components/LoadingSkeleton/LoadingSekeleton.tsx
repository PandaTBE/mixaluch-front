import { useSelector } from 'react-redux';
import { generalReducerValues } from '../../slices/General/general';
import CatalogSkeleton from './components/CatalogSkeleton/CatalogSkeleton';

const LoadingSkeleton = () => {
    const { pageToSwitch } = useSelector(generalReducerValues);

    if (pageToSwitch === '/') {
        return <div>loading...</div>;
    }

    if (pageToSwitch === '/catalog') {
        return <CatalogSkeleton />;
    }

    return <div>loading...</div>;
};

export default LoadingSkeleton;
