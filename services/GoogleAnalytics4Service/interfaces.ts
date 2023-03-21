import { ICategory } from '../../models/Category';
import { IProduct } from '../../models/Product';

export interface IViewItemList {
    event: 'view_item_list';
    ecommerce: {
        items: IViewItem[];
    };
}

export interface IViewItem {
    item_name: string;
    item_id: string;
    price: string;
    item_brand: string;
    item_category: string;
    item_category2: string;
    item_category3: string;
    item_category4: string;
    item_variant: string;
    item_list_name: string;
    item_list_id: string;
    index: number;
    quantity: string;
}

export interface IGenerateViewItemListArgs {
    products: IProduct[];
    selectedCategory?: ICategory;
}

export type TGA4Layers = IViewItemList;
