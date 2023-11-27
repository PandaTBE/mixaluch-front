import { FC } from 'react';
import { useSelector } from 'react-redux';
import { categoryReducerValues } from '../../../../../slices/Category/category';
import { ITableColumnProps } from '../../interfaces';

const Category: FC<ITableColumnProps> = ({ product }) => {
    const { categoriesById } = useSelector(categoryReducerValues);
    return <div>{categoriesById?.[product.category]?.name}</div>;
};

export default Category;
