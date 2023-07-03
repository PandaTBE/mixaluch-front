import { ICategory } from '../models/Category';
import { instance } from '.';

/**
 * Объект с методами, которые необходимы для работы с API категорий
 */
export const CategoryApi = {
    /** Получение всех категорий */
    async getCategories() {
        const data = await instance.get<ICategory[]>('/categories/').then((response) => response.data);
        return data;
    },

    /** Получение основных категорий */
    async getMainCategories() {
        const data = await instance.get<ICategory[]>('/categories/main/').then((response) => response.data);
        return data;
    },
};
