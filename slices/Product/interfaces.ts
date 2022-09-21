export interface IState {
    products: IProduct[] | null;
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

export interface IProduct {
    product_image: IProductImage[];
    regular_price: number;
    description: string;
    category: number;
    title: string;
    id: number;
}
