export interface IState {
    categories: null | ICategory[];
    mainCategories: null | ICategory[];
}

export interface ICategory {
    parent: number | null;
    image: string;
    name: string;
    slug: string;
    id: number;
}
