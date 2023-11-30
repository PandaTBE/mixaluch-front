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
    discount_price: number;
}

export interface IProductDTO {
    regular_price: number;
    min_quantity: number;
    description?: string;
    discount_price: number;
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

export interface IProductImageDTO {
    is_feature?: boolean;
    alt_text?: string;
    product: number;
    image: File;
}
export interface IProductImageUpdateDTO {
    is_feature?: boolean;
    alt_text?: string;
    product: number;
    image?: File;
}

export interface IExternalId {
    id: number;
    data_source: string;
    external_id: string;
    product: number;
}

export interface IExternalIdDTO extends Omit<IExternalId, 'id'> {}

export type TProductUnit = 'KG' | 'PC';
