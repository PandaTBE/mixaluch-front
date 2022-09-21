import { ICategory } from './../Category/interfaces';

export interface IState {
    categoriesByParentId: null | ICategoriesByParentId;
}

export interface ICategoriesByParentId {
    [parentId: string]: {
        children: ICategory[];
        parent: ICategory;
    };
}
