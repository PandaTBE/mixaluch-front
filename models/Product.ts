export interface IProduct {
    product_image: IProductImage[];
    regular_price: number;
    min_quantity: number;
    description: string;
    unit: TProductUnit;
    category: number;
    title: string;
    id: number;
    external_ids: IExternalId[];
    is_popular: boolean;
    slug: string;
}

export interface IProductInfoDTO {
    regular_price: number;
    min_quantity: number;
    description?: string;
    unit: TProductUnit;
    category: number;
    title: string;
    slug: string;
    is_popular: boolean;
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

export interface IExternalId {
    id: number;
    data_source: string;
    external_id: string;
    product: number;
}

export type TProductUnit = 'KG' | 'PC';
