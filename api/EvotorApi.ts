import { instance } from '.';
import { IEvotorProduct, IEvotorStore } from '../models/Evotor';

/**
 * Объект с методами, которые необходимы для работы с API Evotor
 */
export const EvotorApi = {
    /** Получение всех магазинов */
    async getAllStores(authToken: string) {
        const data = await instance
            .get<IEvotorStore[]>('/admin/evotor/stores/', {
                headers: { Authorization: `Token ${authToken}` },
            })
            .then((response) => response.data);
        return data;
    },
    /** Получение списка товаров по Id магазина */
    async getProductsByStoreId(storeId: string, authToken: string) {
        const data = await instance
            .get<IEvotorProduct[]>(`/admin/evotor/stores/${encodeURIComponent(storeId)}/products/`, {
                headers: { Authorization: `Token ${authToken}` },
            })
            .then((response) => response.data);
        return data;
    },
};
