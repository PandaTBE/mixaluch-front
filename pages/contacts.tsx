import ContactsPage from '../components/pages/ContactsPage/ContactsPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница контактов
 */
const Contacts = () => {
    return (
        <MainLayout
            title={'Контакты магазина «У Михалыча»'}
            description={'Адрес, телефон и часы работы магазина «У Михалыча» в Подольске.'}
        >
            <ContactsPage />
        </MainLayout>
    );
};

export default Contacts;
