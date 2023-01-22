import Delivery from './comonents/Delivery/Delivery';
import PageTitle from '../../PageTitle/PageTitle';
import UserInfo from './comonents/UserInfo/UserInfo';
import { OrderingPageContext } from './context';
import { cartReducerValues, storeDeliveryCost } from '../../../slices/Cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import { userReducerValues } from '../../../slices/User/user';
import { Wrapper, WrapperItem } from './styles';

/**
 * Компонент для отображения страницы оформления заказа
 */
const OrderingPage = () => {
    const { totalSum } = useSelector(cartReducerValues);
    const { user } = useSelector(userReducerValues);

    const dispatch = useDispatch();

    const storeDeliveryCostTrans = (value: number) => {
        dispatch(storeDeliveryCost(value));
    };

    const context = {
        totalSum,
        user,
        storeDeliveryCostTrans,
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
