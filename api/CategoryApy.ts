import { ICategory } from '../slices/Category/interfaces';
import { instance } from './intex';

/**
 * Объект с методами, которые необходимы для работы с API категорий
 */
export const CategoryApi = {
    /** Получение всех категорий */
    async getCategories() {
        const data = await instance.get<ICategory[]>('/categories/').then((response) => response.data);
        return data;
    },
};
