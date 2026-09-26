import { NextPage } from 'next';
import AboutPage from '../components/pages/AboutPage/AboutPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Компонент для отображения страницы "О компании"
 */
const About: NextPage = () => {
    return (
        <MainLayout
            title={'О семейном магазине «У Михалыча»'}
            description={'Продукты, мясо, рыба и выпечка в семейном магазине «У Михалыча» в Подольске.'}
        >
            <AboutPage />
        </MainLayout>
    );
};

export default About;
