import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userReducerValues } from '../../../../slices/User/user';
import {
    cartReducerValues,
    FREE_DELIVERY_BORDER,
    storeCartItems,
    storeDeliveryCost,
    storeTotalSum,
    storeTotalSumWithDeliivery,
} from '../../../../slices/Cart/cart';
import { CART_ITEMS_LOCAL_STORAGE_KEY } from '../../../../constants/constants';

/**
 * Касстомный хук для подготовки данных
 */
export const usePrepareData = () => {
    const { cartItems, rawCartItems, totalSum, deliveryCost } = useSelector(cartReducerValues);
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /** Получение суммы корзины */
    useEffect(() => {
        if (cartItems.length) {
            const totalSum = cartItems.reduce((acc, value) => {
                return (acc += value.quantity * value.product.regular_price);
            }, 0);

            dispatch(storeTotalSum(totalSum));
        } else {
            dispatch(storeTotalSum(0));
        }
    }, [cartItems]);

    /** Изменение стоимости доставки в зависимости от суммы заказа */
    useEffect(() => {
        if (totalSum >= FREE_DELIVERY_BORDER) {
            dispatch(storeDeliveryCost(0));
        }
    }, [totalSum]);

    /** Изменение финальной стоимости заказа, включая доставку */
    useEffect(() => {
        dispatch(storeTotalSumWithDeliivery(totalSum + deliveryCost));
    }, [totalSum, deliveryCost]);

    /** Получение товаров для корзины из сырых данных */
    useEffect(() => {
        if (rawCartItems.length) {
            localStorage.setItem(CART_ITEMS_LOCAL_STORAGE_KEY, '[]');
            const result = rawCartItems.map((element) => {
                return {
                    id: element.id,
                    quantity: element.quantity,
                    product: element.product,
                };
            });

            dispatch(storeCartItems(result));
        }
    }, [rawCartItems, authToken]);
};
