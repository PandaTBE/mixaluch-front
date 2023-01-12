import ActivatePage from '../../../components/pages/ActivatePage/ActivatePage';
import { NextPage } from 'next';
import { withMainLayout } from '../../../layouts/MainLayout/MainLayout';

/**
 * Страница активации аккаунта после регистрации
 */
const Activate: NextPage = () => {
    return <ActivatePage />;
};

export default withMainLayout(Activate);
