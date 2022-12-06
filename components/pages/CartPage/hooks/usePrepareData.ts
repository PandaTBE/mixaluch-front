import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cart from '../../../../pages/cart';
import { cartApi } from '../../../../services/CartService';
import {
    cartReducerValues,
    storeCartItems,
    storeCartItemsRefetchObject,
    storeTotalSum,
} from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';
import getCartItemsFromLocalStorage from '../tools/getCartItemsFromLocalStorage';

/**
 * Касстомный хук для подготовки данных
 */
export const usePrepareData = () => {
    const [addCartItemRequest, data] = cartApi.useAddCartItemMutation();
    const { cartItems, rawCartItems } = useSelector(cartReducerValues);
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.data || data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data]);

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
            localStorage.setItem('cartItems', '[]');
            const result = rawCartItems.map((element) => {
                return {
                    id: element.id,
                    quantity: element.quantity,
                    product: element.product,
                };
            });

            dispatch(storeCartItems(result));
        } else {
            const cartItemsFromLocalStorage = getCartItemsFromLocalStorage();
            if (authToken) {
                cartItemsFromLocalStorage.forEach((element) => {
                    addCartItemRequest({
                        authToken,
                        body: { quantity: element.quantity, product: element.product.id },
                    });
                });
                localStorage.setItem('cartItems', '[]');
            }
            dispatch(storeCartItems(cartItemsFromLocalStorage));
        }
    }, [rawCartItems, authToken]);
};
