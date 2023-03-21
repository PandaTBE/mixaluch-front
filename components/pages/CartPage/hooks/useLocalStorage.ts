import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CART_ITEMS_LOCAL_STORAGE_KEY } from '../../../../constants/constants';
import { cartReducerValues, storeCartItems } from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';
import getCartItemsFromLocalStorage from '../tools/getCartItemsFromLocalStorage';

/**
 * Кастомный хук для работы с localStorage
 */
export const useLocalStorage = () => {
    const [isCartItemsLoaded, setIsCartItemsLoaded] = useState(false);
    const { cartItems } = useSelector(cartReducerValues);
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /**
     * Обновление LocalStorage
     */
    useEffect(() => {
        if (!authToken && isCartItemsLoaded) {
            const cartItemsForLocalStorage = JSON.stringify(cartItems);
            localStorage.setItem(CART_ITEMS_LOCAL_STORAGE_KEY, cartItemsForLocalStorage);
        }
    }, [cartItems, authToken, isCartItemsLoaded]);

    /**
     * Получение данных из локал стореджа
     */
    useEffect(() => {
        const cartItemsFromLocalStorage = getCartItemsFromLocalStorage();
        dispatch(storeCartItems(cartItemsFromLocalStorage));
        setIsCartItemsLoaded(true);
    }, []);
};
