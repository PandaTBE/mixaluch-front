import { IProduct } from '../models/Product';
import { instance } from './intex';

/**
 * Объект с методами, которые необходимы для работы с API продуктов
 */
export const ProductApi = {
    /** Получение всех продуктов */
    async getProducts(category?: string) {
        // eslint-disable-next-line prefer-const
        let url = `/products/`;

        if (category) {
            url = `${url}?category=${category}`;
        }

        const data = await instance.get<IProduct[]>(url).then((response) => response.data);
        return data;
    },

    /** Получение популряных продуктов */
    async getPopularProducts() {
        const data = await instance.get<IProduct[]>('/products/popular/').then((response) => response.data);
        return data;
    },
};
