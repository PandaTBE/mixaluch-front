import Kebab from './components/Kebab/Kebab';
import MainCategories from './components/MainCategories/MainCategories';
import PopularProducts from './components/PopularProducts/PopularProducts';
import PromoCarousel from './components/PromoCarousel/PromoCarousel';

/**
 * Начальная страница
 */
const HomePage = () => {
    return (
        <div>
            <PromoCarousel />
            <PopularProducts />
            <MainCategories />
            <Kebab />
        </div>
    );
};

export default HomePage;
