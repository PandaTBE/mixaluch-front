import { TableCellProps } from '@mui/material';
import { IProduct } from '../../../../../models/Product';
import { FC } from 'react';
import Category from '../components/Category/Category';
import { ITableColumnProps } from '../interfaces';
import ExternalIds from '../components/TableBody/components/ExternalIds/ExternalIds';
import Edit from '../components/TableBody/components/Edit/Edit';

export const COLUMNS: {
    id: string;
    key?: keyof IProduct;
    headerText: string;
    align?: TableCellProps['align'];
    component?: FC<ITableColumnProps>;
    isSortDisabled?: boolean;
}[] = [
    {
        id: 'title',
        key: 'title',
        headerText: 'Название',
    },
    {
        id: 'category',
        key: 'category',
        headerText: 'Категория',
        align: 'right',
        component: Category,
    },
    {
        id: 'regular_price',
        key: 'regular_price',
        headerText: 'Цена',
        align: 'right',
    },
    {
        id: 'external_ids',
        key: 'external_ids',
        isSortDisabled: true,
        headerText: 'Связь с эвотор',
        align: 'right',
        component: ExternalIds,
    },
    {
        id: 'edit',
        headerText: 'Редактировать',
        align: 'right',
        component: Edit,
    },
];
