import { ICategory } from '../../../../models/Category';

export interface IProps {
    item: { parent: ICategory; children: ICategory[] };
}
