import { NextPage } from 'next';
import KebabPage from '../components/pages/KebabPage/KebabPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница информации о шашлыке
 */
const Kebab: NextPage = () => {
    return <KebabPage />;
};

export default withMainLayout(Kebab, 'Замариновать мясо для шашлыка на заказ');
