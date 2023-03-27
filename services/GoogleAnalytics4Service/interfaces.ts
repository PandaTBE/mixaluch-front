import { ICategory } from '../../models/Category';
import { IProduct } from '../../models/Product';

export interface IViewItemList {
    event: 'view_item_list';
    ecommerce: {
        items: IViewItemListElement[];
    };
}

export interface IViewItemListElement {
    item_name: string;
    item_id: string;
    price: string;
    item_brand: string;
    item_category: string;
    item_category2?: string;
    item_category3?: string;
    item_category4?: string;
    item_variant?: string;
    item_list_name: string;
    item_list_id: string;
    index: number;
    quantity: string;
}

export interface ISelectItem {
    event: 'select_item';
    ecommerce: {
        items: {
            item_name: string;
            item_id: string;
            price: string;
            item_brand?: string;
            item_category?: string;
            item_category2?: string;
            item_category3?: string;
            item_category4?: string;
            item_variant?: string;
            promotion_id?: string;
            promotion_name?: string;
            creative_name?: string;
            creative_slot?: string;
            location_id?: string;
            index: number;
            quantity: string;
        }[];
    };
}

export interface IViewItem {
    event: 'view_item';
    ecommerce: {
        items: {
            item_name: string;
            item_id: string;
            price: string;
            item_brand?: string;
            item_category?: string;
            item_category2?: string;
            item_category3?: string;
            item_category4?: string;
            item_variant?: string;
            item_list_name?: string;
            item_list_id?: string;
            index: number;
            quantity: string;
        }[];
    };
}

export interface IAddToCart {
    event: 'add_to_cart';
    ecommerce: {
        items: {
            item_name: string;
            item_id: string;
            price: string;
            item_brand?: string;
            item_category?: string;
            item_category2?: string;
            item_category3?: string;
            item_category4?: string;
            item_variant?: string;
            item_list_name?: string;
            item_list_id?: string;
            index: number;
            quantity: string;
        }[];
    };
}

export interface IRemoveFromCart {
    event: 'remove_from_cart';
    ecommerce: {
        items: {
            item_name: string;
            item_id: string;
            price: string;
            item_brand?: string;
            item_category?: string;
            item_variant?: string;
            item_list_name?: string;
            item_list_id?: string;
            index: number;
            quantity: string;
        }[];
    };
}

export interface IViewCart {
    event: 'view_cart';
    ecommerce: {
        items: {
            item_name: string;
            item_id: string;
            price: string;
            item_brand?: string;
            item_category?: string;
            item_category2?: string;
            item_category3?: string;
            item_category4?: string;
            item_variant?: string;
            quantity: string;
        }[];
    };
}

export interface IBeginCheckout {
    event: 'begin_checkout';
    ecommerce: {
        items: {
            item_name: string;
            item_id: string;
            price: string;
            item_brand?: string;
            item_category?: string;
            item_category2?: string;
            item_category3?: string;
            item_category4?: string;
            item_variant?: string;
            item_list_name?: string;
            item_list_id?: string;
            index: number;
            quantity: string;
        }[];
    };
}

export interface IGenerateViewItemListArgs {
    products: IProduct[];
    selectedCategory?: ICategory;
}

export type TGA4Layers =
    | IViewItemList
    | ISelectItem
    | IViewItem
    | IAddToCart
    | IRemoveFromCart
    | IViewCart
    | IBeginCheckout;
