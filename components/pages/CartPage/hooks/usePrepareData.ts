import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartReducerValues, storeCartItems, storeTotalSum } from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';

/**
 * Касстомный хук для подготовки данных
 */
export const usePrepareData = () => {
    const { cartItems, rawCartItems } = useSelector(cartReducerValues);
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

    /** Получение товаров для корзины из сырых данных */
    useEffect(() => {
        if (rawCartItems.length) {
            localStorage.setItem('cartItems', '[]');
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
