import { ICategory } from '../../models/Category';

export interface IState {
    categories: null | ICategory[];
    mainCategories: null | ICategory[];
}
