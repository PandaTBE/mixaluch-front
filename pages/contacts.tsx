import ContactsPage from '../components/pages/ContactsPage/ContactsPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница контактов
 */
const Contacts = () => {
    return <ContactsPage />;
};

export default withMainLayout(Contacts);
