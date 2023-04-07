export interface IProduct {
    product_image: IProductImage[];
    regular_price: number;
    min_quantity: number;
    description: string;
    unit: TProductUnit;
    category: number;
    title: string;
    id: number;
}

export interface IProductImage {
    is_feature: boolean;
    created_at: string;
    updated_at: string;
    alt_text: string;
    product: number;
    image: string;
    id: number;
}

export type TProductUnit = 'KG' | 'PC';
