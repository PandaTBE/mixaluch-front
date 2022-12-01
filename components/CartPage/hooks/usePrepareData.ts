import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartReducerValues, storeCartItems, storeTotalSum } from '../../../slices/Cart/cart';

/**
 * Касстомный хук для подготовки данных
 */
export const usePrepareData = () => {
    const { cartItems, rawCartItems } = useSelector(cartReducerValues);
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

    useEffect(() => {
        if (rawCartItems.length) {
            const result = rawCartItems.map((element) => {
                return {
                    quantity: element.quantity,
                    product: element.product,
                };
            });

            dispatch(storeCartItems(result));
        }
    }, [rawCartItems]);
};
