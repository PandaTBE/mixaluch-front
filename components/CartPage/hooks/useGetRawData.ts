import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartApi } from '../../../services/CartService';
import { storeRawCartItems } from '../../../slices/Cart/cart';
import { userReducerValues } from '../../../slices/User/user';
import { useLocalStorage } from './useLocalStorage';
import { usePrepareData } from './usePrepareData';

/**
 * Кастомный хук для получения сырых данных
 */
export const useGetRawData = () => {
    const [getCartItems, { data }] = cartApi.useGetCartItemsMutation();
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();
    useLocalStorage();
    usePrepareData();

    /** Сохранение сырых данных для корзины */
    useEffect(() => {
        if (data) {
            dispatch(storeRawCartItems(data));
        }
    }, [data]);

    /** Получение сырых данных для корзины */
    useEffect(() => {
        if (authToken) {
            getCartItems(authToken);
        }
    }, [authToken]);
};
