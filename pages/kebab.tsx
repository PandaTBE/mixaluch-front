import { NextPage } from 'next';
import KebabPage from '../components/pages/KebabPage/KebabPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница информации о шашлыке
 */
const Kebab: NextPage = () => {
    return (
        <MainLayout title={'Замариновать мясо для шашлыка на заказ'}>
            <KebabPage />
        </MainLayout>
    );
};

export default Kebab;
