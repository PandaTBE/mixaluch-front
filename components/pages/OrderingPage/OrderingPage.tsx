import { useSelector } from 'react-redux';
import { userReducerValues } from '../../../slices/User/user';
import PageTitle from '../../PageTitle/PageTitle';
import UserInfo from './comonents/UserInfo/UserInfo';
import { Wrapper, WrapperItem } from './styles';
import { OrderingPageContext } from './context';
import Delivery from './comonents/Delivery/Delivery';

/**
 * Компонент для отображения страницы оформления заказа
 */
const OrderingPage = () => {
    const { user } = useSelector(userReducerValues);

    const context = {
        user,
    };

    return (
        <OrderingPageContext.Provider value={context}>
            <Wrapper>
                <WrapperItem>
                    <PageTitle>
                        <div>Оформление заказа</div>
                    </PageTitle>
                    {user && <UserInfo />}
                    <Delivery />
                </WrapperItem>
                <WrapperItem></WrapperItem>
            </Wrapper>
        </OrderingPageContext.Provider>
    );
};

export default OrderingPage;
