import { EvotorApi } from '../../EvotorApi';

export const AdminProductsApi = {
    /** Дополнительные данные Эвотор загружаются отдельно от каталога. */
    async getEvotorData(authToken: string) {
        const stores = await EvotorApi.getAllStores(authToken);
        const responses = await Promise.all(
            stores.map(async (store) => [store.uuid, await EvotorApi.getProductsByStoreId(store.uuid, authToken)] as const),
        );

        return { stores, productsByStoreId: Object.fromEntries(responses) };
    },
};
