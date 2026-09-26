import { IProduct, IProductCard } from '../models/Product';
import { instance } from '.';

/**
 * Объект с методами, которые необходимы для работы с API продуктов
 */
export const ProductApi = {
    /** Страница публичного каталога. Старый список нужен админке и корзине. */
    async getProductsV2(
        params: {
            category?: number;
            search?: string;
            page?: number;
            sortBy?: 'price' | 'name';
            sortOrder?: 'asc' | 'desc';
        } = {},
    ) {
        const query = new URLSearchParams();
        if (params.category) query.set('category', String(params.category));
        if (params.search) query.set('search', params.search);
        if (params.page) query.set('page', String(params.page));
        if (params.sortBy) query.set('sort_by', params.sortBy);
        if (params.sortOrder) query.set('sort_order', params.sortOrder);
        const suffix = query.toString();
        const response = await instance.get<{
            count: number;
            next: string | null;
            previous: string | null;
            results: IProductCard[];
        }>(`/v2/products/${suffix ? `?${suffix}` : ''}`);
        return response.data;
    },
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
