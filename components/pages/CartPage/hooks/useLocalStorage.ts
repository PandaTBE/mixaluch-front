import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartReducerValues, storeCartItems } from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';
import getCartItemsFromLocalStorage from '../tools/getCartItemsFromLocalStorage';

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

    /**
     * Получение данных из локал стореджа
     */
    useEffect(() => {
        const cartItemsFromLocalStorage = getCartItemsFromLocalStorage();
        dispatch(storeCartItems(cartItemsFromLocalStorage));
    }, []);
};
