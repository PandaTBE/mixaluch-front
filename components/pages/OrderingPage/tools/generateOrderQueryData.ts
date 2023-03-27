import { IExtendedCartItem } from '../../../../slices/Cart/interfaces';
import { IOrderDTO, TOrderDeliveryType, TOrderPaymentType } from '../../../../models/Order';
import { IOrderFormValues } from '../components/Delivery/interfaces';
import { omit } from 'lodash';

interface IArgs {
    /** элементы заказа (продукты) */
    orderItems: IExtendedCartItem[];
    /** Значения из формы оформления заказа*/
    formValues: IOrderFormValues;
    /** Сумма всех товаров в корзине */
    totalSum: number;
    /** Стоимость доставки */
    deliveryCost: number;
    /** Сумма всех товаров, с учетом доставки */
    totalSumWithDelivery: number;
}

/**
 * Функция для генерации тела запросы для создания заказа
 */
const generateOrderQueryData = (args: IArgs): IOrderDTO => {
    const { orderItems, formValues, totalSum, deliveryCost, totalSumWithDelivery } = args;

    let deliveryType: TOrderDeliveryType = 'COURIER_DELIVERY';
    let paymentType: TOrderPaymentType = 'CARD_PAYMENT';

    if (formValues.selfDelivery) deliveryType = 'SELF_DELIVERY';
    if (formValues.cashPayment) paymentType = 'CASH_PAYMENT';

    const products = orderItems.map((orderItem) => omit(orderItem, 'id'));

    const result: IOrderDTO = {
        total_sum_with_delivery: Math.floor(totalSumWithDelivery),
        phone_number: formValues.phone_number,
        delivery_cost: deliveryCost,
        address: formValues.address,
        delivery_type: deliveryType,
        payment_type: paymentType,
        name: formValues.name,
        total_sum: Math.floor(totalSum),
        comment: formValues.comment,
        order_data: {
            products,
        },
    };

    return result;
};

export default generateOrderQueryData;
