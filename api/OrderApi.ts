import { AxiosRequestHeaders } from 'axios';
import { IOrder } from '../models/Order';
import { instance } from './intex';

/**
 * Объект с методами для работы с АПИ заказов
 */
export const OrderApi = {
    /**
     * Получение  информации о заказе
     */
    async getOrderInfo(id: number) {
        const data = await instance.get<IOrder>(`/order-info/${id}/`).then((response) => response.data);
        return data;
    },

    /**
     * Получение всех заказов
     */
    async getOrders(authToken?: string) {
        const headers: AxiosRequestHeaders = {};
        if (authToken) headers['Authorization'] = `Token ${authToken}`;
        const data = await instance.get<IOrder[]>('/orders/', { headers }).then((response) => response.data);
        return data;
    },
};
