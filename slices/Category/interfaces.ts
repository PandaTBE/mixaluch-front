export interface IState {
    categories: null | ICategory[];
}

export interface ICategory {
    parent: number | null;
    is_active: boolean;
    tree_id: number;
    level: number;
    name: string;
    slug: string;
    rght: number;
    lft: number;
    id: number;
}
