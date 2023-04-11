import ContactsPage from '../components/pages/ContactsPage/ContactsPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница контактов
 */
const Contacts = () => {
    return (
        <MainLayout title={'Контакты – Информация о компании'}>
            <ContactsPage />
        </MainLayout>
    );
};

export default Contacts;
