import { useSelector } from 'react-redux';
import { orderReducerValues } from '../../../slices/Order/order';
import PageTitle from '../../PageTitle/PageTitle';
import OrderInfo from './components/OrderInfo/OrderInfo';
import { StyledDivider, SubTitle, Wrapper } from './styles';

/**
 * компонент для отображения страницы информации о конкретном заказе
 */
const OrderInfoPage = () => {
    const { selectedOrder } = useSelector(orderReducerValues);
    return (
        <Wrapper>
            {selectedOrder ? (
                <>
                    <PageTitle>
                        <div>Заказ № {selectedOrder.id}</div>
                    </PageTitle>
                    <SubTitle>Информация о заказе</SubTitle>
                    <StyledDivider />
                    <OrderInfo order={selectedOrder} />
                    <StyledDivider />
                    <SubTitle>Cостав заказа</SubTitle>
                </>
            ) : (
                <div>Невозможно получить информацию о заказе</div>
            )}
        </Wrapper>
    );
};

export default OrderInfoPage;
