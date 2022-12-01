import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cartApi } from '../../../services/CartService';
import { userReducerValues } from '../../../slices/User/user';
import { useLocalStorage } from './useLocalStorage';
import { usePrepareData } from './usePrepareData';

/**
 * Кастомный хук для получения сырых данных
 */
export const useGetRawData = () => {
    const [getCartItems, { data, isError, isLoading }] = cartApi.useGetCartItemsMutation();
    const { authToken } = useSelector(userReducerValues);
    useLocalStorage();
    usePrepareData();

    useEffect(() => {
        console.log(data);
    }, [data]);

    useEffect(() => {
        if (authToken) {
            getCartItems(authToken);
        }
    }, [authToken]);
};
