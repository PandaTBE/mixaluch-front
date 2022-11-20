import { ICategory } from '../../models/Category';

export interface IState {
    categoriesByParentId: null | ICategoriesByParentId;
    selectedCategoryId: number | null;
}

export interface ICategoriesByParentId {
    [parentId: string]: {
        children: ICategory[];
        parent: ICategory;
    };
}
