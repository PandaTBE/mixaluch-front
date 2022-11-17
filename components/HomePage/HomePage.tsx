import Advantages from './components/Anvantages/Advantages';
import Feedback from './components/Feedback/Feedback';
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
            <Advantages />
            <Feedback />
        </div>
    );
};

export default HomePage;
