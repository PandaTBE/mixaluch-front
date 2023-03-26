import { IProduct } from '../../models/Product';
import { IExtendedCartItem } from '../../slices/Cart/interfaces';
import {
    IAddToCart,
    IGenerateViewItemListArgs,
    IRemoveFromCart,
    ISelectItem,
    IViewItem,
    IViewItemList,
    TGA4Layers,
} from './interfaces';

export const googleAnalytics4DataLayers = {
    /**
     * Функция для получения структуры view_item_list для отправки в GA4
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
                    item_list_name: selectedCategory?.name || 'All products',
                    item_list_id: selectedCategory?.id.toString() || 'AllProducts',
                    quantity: '1',
                    index,
                })),
            },
        };
    },

    /**
     * Функция для получения структуры select_item для отправки в GA4
     */
    generateSelectItem: (product: IProduct): ISelectItem => {
        return {
            event: 'select_item',
            ecommerce: {
                items: [
                    {
                        item_name: product.title,
                        item_id: product.id.toString(),
                        price: product.regular_price.toString(),
                        index: 1,
                        quantity: '1',
                    },
                ],
            },
        };
    },

    /**
     * Функция для получения структуры view_item для отправки в GA4
     */
    generateViewItem: (product: IProduct): IViewItem => {
        return {
            event: 'view_item',
            ecommerce: {
                items: [
                    {
                        item_name: product.title,
                        item_id: product.id.toString(),
                        price: product.regular_price.toString(),
                        index: 1,
                        quantity: '1',
                    },
                ],
            },
        };
    },

    /**
     * Функция для получения структуры add_to_cart для отправки в GA4
     */
    generateAddToCart: (product: IProduct): IAddToCart => {
        return {
            event: 'add_to_cart',
            ecommerce: {
                items: [
                    {
                        item_name: product.title,
                        item_id: product.id.toString(),
                        price: product.regular_price.toString(),
                        index: 1,
                        quantity: '1',
                    },
                ],
            },
        };
    },

    /**
     * Функция для получения структуры remove_from_cart для отправки в GA4
     */
    generateRemoveFromCart: (cartItem: IExtendedCartItem): IRemoveFromCart => {
        return {
            event: 'remove_from_cart',
            ecommerce: {
                items: [
                    {
                        item_name: cartItem.product.title,
                        item_id: cartItem.product.id.toString(),
                        price: cartItem.product.regular_price.toString(),
                        index: 1,
                        quantity: cartItem.quantity.toString(),
                    },
                ],
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
