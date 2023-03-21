import { IGenerateViewItemListArgs, IViewItemList, TGA4Layers } from './interfaces';

export const googleAnalytics4DataLayers = {
    /**
     * Функция для получения структуры для отправки в GA4
     */
    generateViewItemList: (args: IGenerateViewItemListArgs): IViewItemList => {
        const { products, selectedCategory } = args;
        return {
            event: 'view_item_list',
            ecommerce: {
                items: products.map((element, index) => ({
                    item_name: element.title,
                    item_id: element.id.toString(),
                    price: element.regular_price.toString(),
                    item_brand: 'Mixaluch',
                    item_category: selectedCategory?.name || 'All products',
                    item_category2: '-',
                    item_category3: '-',
                    item_category4: '-',
                    item_variant: 'None',
                    item_list_name: selectedCategory?.name || 'All products',
                    item_list_id: selectedCategory?.id.toString() || 'AllProducts',
                    quantity: '1',
                    index,
                })),
            },
        };
    },
};

type WindowWithDataLayer = Window & {
    dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

/**
 * Функция для добавления новый слоев
 */
export const sendNewDataLayer = (newLayer: TGA4Layers): void => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(newLayer);
};
