import { INews } from '../models/News';
import { instance } from '.';

/**
 * Объект с методами, которые необходимы для работы с API новостей
 */
export const NewsApi = {
    /** Получение важных новостей */
    async getImportantNews() {
        const data = await instance.get<INews[]>('/important-news/').then((response) => response.data);
        return data;
    },
};
