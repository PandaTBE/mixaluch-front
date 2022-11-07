import { ContentWrapper } from './styles';
import PageTitle from '../PageTitle/PageTitle';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../slices/User/user';
import { withUserAccountSidebar } from '../../layouts/UserAccountSidebarLayout/UserAccountSidebarLayout';

/**
 * Компонент для обновления данных пользователя
 */
const UserAccountPage = () => {
    const { userFetching, userFetchingError, user } = useSelector(userReducerValues);

    return (
        <div>
            <PageTitle>
                <div>Контактные данные</div>
            </PageTitle>
            <ContentWrapper>
                {userFetching && <div>Загрузка данных...</div>}
                {userFetchingError && <div>Ошибка получения данных пользователя</div>}
            </ContentWrapper>
        </div>
    );
};

export default withUserAccountSidebar(UserAccountPage);
