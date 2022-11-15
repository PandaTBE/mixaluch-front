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
        </div>
    );
};

export default HomePage;
