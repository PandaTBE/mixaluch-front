import { useContext } from 'react';
import { OrderingPageContext } from '../../context';
import { Title, UserData, Wrapper } from './styles';

/**
 * компонент для отображения информации о пользователе
 */
const UserInfo = () => {
    const context = useContext(OrderingPageContext);

    if (!context?.user) return null;
    return (
        <Wrapper>
            <Title>
                Вы авторизовались как {context.user.name} {context.user.second_name}
            </Title>
            <UserData>{context.user.phone_number}</UserData>
            <UserData>{context.user.email}</UserData>
        </Wrapper>
    );
};

export default UserInfo;
