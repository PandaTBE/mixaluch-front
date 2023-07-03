import { ICartItem } from '../models/CartItem';
import { instance } from '.';

/**
 * Объект с методами, которые необходимы для работы с API корзины
 */
export const CategoryApi = {
    /** Получение всех товаров в корзине */
    async getCartItems() {
        const data = await instance.get<ICartItem[]>('/cart/').then((response) => response.data);
        return data;
    },
};
