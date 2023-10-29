import { NextPage } from 'next';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPageLayout from '../../../layouts/AdminPageLayout/AdminPageLayout';

const Categories: NextPage = () => {
    return (
        <MainLayout title="Редактирование категорий">
            <StaffOnlyPage>
                <AdminPageLayout>
                    <div>Категории</div>
                </AdminPageLayout>
            </StaffOnlyPage>
        </MainLayout>
    );
};

export default Categories;
