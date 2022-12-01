import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartReducerValues, storeCartItems } from '../../../slices/Cart/cart';

/**
 * Кастомный хук для работы с localStorage
 */
export const useLocalStorage = () => {
    const { cartItems } = useSelector(cartReducerValues);
    const dispatch = useDispatch();

    /**
     * Обновление LocalStorage
     */
    useEffect(() => {
        if (cartItems.length) {
            const cartItemsForLocalStorage = JSON.stringify(cartItems);
            localStorage.setItem('cartItems', cartItemsForLocalStorage);
        }
    }, [cartItems]);

    /**
     * Получение данных из LocalStorage
     */
    useEffect(() => {
        const cartItemsFromLocalStorage = localStorage.getItem('cartItems');
        if (cartItemsFromLocalStorage) {
            try {
                const parsedData = JSON.parse(cartItemsFromLocalStorage);
                dispatch(storeCartItems(parsedData));
            } catch (error) {
                console.log('cart items from localStorage parse error >>>>  ', error);
            }
        }
    }, []);
};
