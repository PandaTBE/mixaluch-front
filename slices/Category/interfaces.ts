import { ICategory } from '../../models/Category';

export interface IState {
    categories: null | ICategory[];
    mainCategories: null | ICategory[];
    categoriesById: null | { [id: string]: ICategory };
}
