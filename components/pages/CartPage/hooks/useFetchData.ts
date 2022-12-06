import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartApi } from '../../../../services/CartService';
import {
    cartReducerValues,
    storeCartItems,
    storeCartItemsRefetchObject,
    storeRawCartItems,
} from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';
import getCartItemsFromLocalStorage from '../tools/getCartItemsFromLocalStorage';
import { useLocalStorage } from './useLocalStorage';
import { usePrepareData } from './usePrepareData';

/**
 * Кастомный хук для получения сырых данных
 */
export const useGetRawData = () => {
    const [addCartItemRequest, cartItemResponse] = cartApi.useAddCartItemMutation();
    const [getCartItems, { data }] = cartApi.useGetCartItemsMutation();
    const { authToken } = useSelector(userReducerValues);
    const { refetchCartItems } = useSelector(cartReducerValues);
    const dispatch = useDispatch();
    useLocalStorage();
    usePrepareData();

    /** Обновление товаров в корзине */
    useEffect(() => {
        if (cartItemResponse.data || cartItemResponse.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [cartItemResponse]);

    /** Сохранение сырых данных для корзины */
    useEffect(() => {
        if (data) {
            dispatch(storeRawCartItems(data));
            if (!data.length) {
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
        }
    }, [data]);

    /** Получение сырых данных для корзины */
    useEffect(() => {
        if (authToken) {
            getCartItems(authToken);
        }
    }, [authToken, refetchCartItems]);
};
