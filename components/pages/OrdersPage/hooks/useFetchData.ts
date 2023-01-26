import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderApi } from '../../../../services/OrderService';
import { storeOrders, toggleOrdersFetching, toggleOrdersFetchingError } from '../../../../slices/Order/order';
import { userReducerValues } from '../../../../slices/User/user';

/**
 * Кастомный хук для получения данных с сервера
 */
const useFetchData = () => {
    const [getOrders, { data, isLoading, isError }] = orderApi.useGetOrdersMutation();
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /**
     * изменение флага ошибки при получении заказов
     */
    useEffect(() => {
        dispatch(toggleOrdersFetchingError(isError));
    }, [isError]);

    /**
     * Изменение флага получения заказов
     */
    useEffect(() => {
        dispatch(toggleOrdersFetching(isLoading));
    }, [isLoading]);

    /**
     * Запись всех заказов для данного пользователя
     */
    useEffect(() => {
        if (data) {
            dispatch(storeOrders(data));
        }
    }, [data]);

    /**
     * Получение всех заказов для данного пользователя
     */
    useEffect(() => {
        if (authToken && !isLoading) {
            getOrders(authToken);
        }
    }, [authToken]);
};

export default useFetchData;
