import { DateTime } from 'luxon';
import { FC } from 'react';
import { InfoWrapper, OrderDataKey } from './styles';
import { IOrder } from '../../../../../models/Order';
import {
    orderDeliveryTypeMap,
    orderPaymentTypeMap,
    orderStatusMap,
} from '../../../../../slices/Order/constants/constants';

interface IProps {
    /** Данные заказа */
    order: IOrder;
}

/**
 * Компонент для отображения информации о заказе
 */
const OrderInfo: FC<IProps> = ({ order }) => {
    return (
        <>
            <InfoWrapper>
                <OrderDataKey>Дата оформления</OrderDataKey>
                <div>{DateTime.fromISO(order.created_at).toFormat('dd.MM.yyyy HH:mm')}</div>
            </InfoWrapper>
            <InfoWrapper>
                <OrderDataKey>Статус заказа</OrderDataKey>
                <span>{orderStatusMap[order.status] || order.status}</span>
            </InfoWrapper>
            <InfoWrapper>
                <OrderDataKey>Сумма заказа</OrderDataKey>
                <span>{order.total_sum_with_delivery} ₽</span>
            </InfoWrapper>
            <InfoWrapper>
                <OrderDataKey>Способ оплаты</OrderDataKey>
                <div>{orderPaymentTypeMap[order.payment_type] || order.payment_type}</div>
            </InfoWrapper>
            <InfoWrapper>
                <OrderDataKey>Способ доставки</OrderDataKey>
                <div>{orderDeliveryTypeMap[order.delivery_type] || order.delivery_type}</div>
            </InfoWrapper>
            {order.delivery_type === 'COURIER_DELIVERY' && (
                <InfoWrapper>
                    <OrderDataKey>Адрес доставки</OrderDataKey>
                    <div>{order.address}</div>
                </InfoWrapper>
            )}
            <InfoWrapper>
                <OrderDataKey>Получатель</OrderDataKey>
                <div>{order.name}</div>
            </InfoWrapper>
            <InfoWrapper>
                <OrderDataKey>Телефон</OrderDataKey>
                <div>{order.phone_number}</div>
            </InfoWrapper>
            {order.comment && (
                <InfoWrapper>
                    <OrderDataKey>комментарий</OrderDataKey>
                    <div>{order.comment}</div>
                </InfoWrapper>
            )}
        </>
    );
};

export default OrderInfo;
