import { ICategory } from '../../../models/Category';
import { IEvotorProduct, IEvotorStore } from '../../../models/Evotor';
import { IProduct } from '../../../models/Product';
import { TProductsByStoreId } from '../../../slices/Evotor/interfaces';
import { CategoryApi } from '../../CategoryApi';
import { EvotorApi } from '../../EvotorApi';
import { ProductApi } from '../../ProductApi';

export const AdminProductsApi = {
    /** Получение начальных данных для страницы редактирования товаров */
    async getAdminProductsPageData(): Promise<{
        categories: ICategory[] | null;
        products: IProduct[] | null;
        stores: IEvotorStore[];
        productsByStoreId: TProductsByStoreId;
    }> {
        let categories: ICategory[] | null = null;
        let products: IProduct[] | null = null;
        let stores: IEvotorStore[] = [];
        let productsByStoreId: TProductsByStoreId = null;

        const productsPromises: Promise<{ data: IEvotorProduct[]; storeId: string }>[] = [];

        const categoriesRequest = CategoryApi.getCategories();
        const productsRequest = ProductApi.getProducts();
        const storesRequest = EvotorApi.getAllStores();

        await Promise.allSettled([categoriesRequest, productsRequest, storesRequest]).then(
            ([categoriesRes, productsRes, storesRes]) => {
                if (categoriesRes.status === 'fulfilled') {
                    categories = categoriesRes.value;
                }

                if (productsRes.status === 'fulfilled') {
                    products = productsRes.value;
                }

                if (storesRes.status === 'fulfilled') {
                    stores = storesRes.value;
                    stores.forEach((store) => {
                        productsPromises.push(
                            EvotorApi.getProductsByStoreId(store.uuid).then((response) => ({
                                data: response,
                                storeId: store.uuid,
                            })),
                        );
                    });
                }
            },
        );

        await Promise.all(productsPromises).then((responses) => {
            const result = responses.reduce((acc, value) => {
                acc[value.storeId] = value.data;
                return acc;
            }, {} as { [storeId: string]: IEvotorProduct[] });
            productsByStoreId = result;
        });

        return {
            categories,
            products,
            stores,
            productsByStoreId,
        };
    },
};
