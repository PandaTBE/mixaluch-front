import { evotorInstance } from '.';
import { IEvotorProduct, IEvotorStore } from '../models/Evotor';

/**
 * Объект с методами, которые необходимы для работы с API Evotor
 */
export const EvotorApi = {
    /** Получение всех магазинов */
    async getAllStores() {
        const data = await evotorInstance
            .get<IEvotorStore[]>('/inventories/stores/search')
            .then((response) => response.data);
        return data;
    },
    /** Получение списка товаров по Id магазина */
    async getProductsByStoreId(storeId: string) {
        const data = await evotorInstance
            .get<IEvotorProduct[]>(`/inventories/stores/${storeId}/products`)
            .then((response) => response.data);
        return data;
    },
};
