import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartReducerValues, storeCartItems } from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';

/**
 * Кастомный хук для работы с localStorage
 */
export const useLocalStorage = () => {
    const { cartItems } = useSelector(cartReducerValues);
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /**
     * Обновление LocalStorage
     */
    useEffect(() => {
        if (cartItems.length && !authToken) {
            const cartItemsForLocalStorage = JSON.stringify(cartItems);
            localStorage.setItem('cartItems', cartItemsForLocalStorage);
        }
    }, [cartItems, authToken]);
};
