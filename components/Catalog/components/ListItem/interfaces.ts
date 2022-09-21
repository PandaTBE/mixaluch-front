import { ICategory } from '../../../../slices/Category/interfaces';

export interface IProps {
    item: { parent: ICategory; children: ICategory[] };
}
