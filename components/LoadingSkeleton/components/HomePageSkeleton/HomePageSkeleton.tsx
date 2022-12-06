import { Grid, Skeleton } from '@mui/material';
import Advantages from '../../../pages/HomePage/components/Anvantages/Advantages';
import Feedback from '../../../pages/HomePage/components/Feedback/Feedback';
import Kebab from '../../../pages/HomePage/components/Kebab/Kebab';
import MainCategories from '../../../pages/HomePage/components/MainCategories/MainCategories';
import PopularProducts from '../../../pages/HomePage/components/PopularProducts/PopularProducts';
import PromoCarousel from '../../../pages/HomePage/components/PromoCarousel/PromoCarousel';

/**
 * Компонент для отображения зазрузки
 */
const HomePageSkeleton = () => (
    <div>
        <PromoCarousel />
        <PopularProducts isSkeleton={true} />
        <MainCategories isSkeleton={true} />
        <Kebab />
        <Advantages />
        <Feedback />
    </div>
);

export default HomePageSkeleton;
