import { NextPage } from 'next';
import AboutPage from '../components/pages/AboutPage/AboutPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Компонент для отображения страницы "О компании"
 */
const About: NextPage = () => {
    return (
        <MainLayout title={'Информация о компании'}>
            <AboutPage />
        </MainLayout>
    );
};

export default About;
