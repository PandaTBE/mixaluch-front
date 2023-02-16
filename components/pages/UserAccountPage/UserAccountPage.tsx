import { ContentWrapper, UserData } from './styles';

import PageTitle from '../../PageTitle/PageTitle';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../../slices/User/user';

/**
 * Компонент для обновления данных пользователя
 */
const UserAccountPage = () => {
    const { userFetching, userFetchingError, user } = useSelector(userReducerValues);

    return (
        <div>
            <PageTitle text={'Контактные данные'} />
            <ContentWrapper>
                {userFetching && <div>Загрузка данных...</div>}
                {userFetchingError && <div>Ошибка получения данных пользователя</div>}
                {user && (
                    <>
                        <UserData>
                            <span>Имя:</span>
                            {user.name}
                        </UserData>
                        <UserData>
                            <span>Телефон:</span>
                            {user.phone_number}
                        </UserData>
                        <UserData>
                            <span>Email:</span>
                            {user.email}
                        </UserData>
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default UserAccountPage;
