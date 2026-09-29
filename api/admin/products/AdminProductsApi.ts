import { EvotorApi } from '../../EvotorApi';

async function fetchEvotorData(authToken: string) {
    const stores = await EvotorApi.getAllStores(authToken);
    const responses = await Promise.all(
        stores.map(async (store) => {
            const products = await EvotorApi.getProductsByStoreId(store.uuid, authToken);
            return [store.uuid, products] as const;
        }),
    );
    return { stores, productsByStoreId: Object.fromEntries(responses) };
}

let cache: { token: string; until: number; result: ReturnType<typeof fetchEvotorData> } | null = null;

export const AdminProductsApi = {
    /** Дополнительные данные Эвотор загружаются отдельно от каталога. */
    async getEvotorData(authToken: string) {
        if (cache?.token === authToken && cache.until > Date.now()) return cache.result;
        const result = fetchEvotorData(authToken);
        cache = { token: authToken, until: Date.now() + 30_000, result };
        try {
            return await result;
        } catch (error) {
            if (cache?.result === result) cache = null;
            throw error;
        }
    },
};
