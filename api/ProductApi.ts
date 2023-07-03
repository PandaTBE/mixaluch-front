import { IProduct } from '../models/Product';
import { instance } from '.';

/**
 * Объект с методами, которые необходимы для работы с API продуктов
 */
export const ProductApi = {
    /** Получение всех продуктов */
    async getProducts() {
        const data = await instance.get<IProduct[]>('/products/').then((response) => response.data);
        return data;
    },

    /** Получение популряных продуктов */
    async getPopularProducts() {
        const data = await instance.get<IProduct[]>('/products/popular/').then((response) => response.data);
        return data;
    },

    /** Получение информации о выбранном товаре */
    async getProductInfo(id: number) {
        const data = await instance.get<IProduct>(`/products/${id}/`).then((response) => response.data);
        return data;
    },
};
