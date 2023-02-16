import { NextPage } from 'next';
import AboutPage from '../components/pages/AboutPage/AboutPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Компонент для отображения страницы "О компании"
 */
const About: NextPage = () => {
    return <AboutPage />;
};

export default withMainLayout(About, 'Информация о компании');
