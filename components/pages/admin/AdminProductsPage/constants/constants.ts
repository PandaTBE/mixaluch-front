import { TableCellProps } from '@mui/material';
import { IProduct } from '../../../../../models/Product';
import { FC } from 'react';
import Category from '../components/Category/Category';
import { ITableColumnProps, TOrder } from '../interfaces';
import ExternalIds from '../components/TableBody/components/ExternalIds/ExternalIds';
import Edit from '../components/TableBody/components/Edit/Edit';
import { TProductsByStoreIdByProductId } from '../../../../../slices/Evotor/interfaces';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../constants/admin';

export const COLUMNS: {
    id: string;
    key?: keyof IProduct;
    headerText: string;
    align?: TableCellProps['align'];
    component?: FC<ITableColumnProps>;
    isSortDisabled?: boolean;
    sortHandler?: (
        a: IProduct,
        b: IProduct,
        order: TOrder,
        productsByStoreIdByProductId: TProductsByStoreIdByProductId,
    ) => number;
}[] = [
    {
        id: 'title',
        key: 'title',
        headerText: 'Название',
        sortHandler: (a, b, order) => {
            const multiplier = order === 'asc' ? 1 : -1;
            return a.title > b.title ? 1 * multiplier : -1 * multiplier;
        },
    },
    {
        id: 'category',
        key: 'category',
        headerText: 'Категория',
        align: 'right',
        component: Category,
        sortHandler: (a, b, order) => {
            const multiplier = order === 'asc' ? 1 : -1;
            return a.category > b.category ? 1 * multiplier : -1 * multiplier;
        },
    },
    {
        id: 'regular_price',
        key: 'regular_price',
        headerText: 'Цена',
        align: 'right',
        sortHandler: (a, b, order) => {
            const multiplier = order === 'asc' ? 1 : -1;
            return a.regular_price > b.regular_price ? 1 * multiplier : -1 * multiplier;
        },
    },
    {
        id: 'external_ids',
        key: 'external_ids',
        headerText: 'Связь с эвотор',
        align: 'right',
        component: ExternalIds,
        sortHandler: (a, b, order, productsByStoreIdByProductId) => {
            const aExternalId = a.external_ids.find((item) => item.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE);
            const bExternalId = b.external_ids.find((item) => item.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE);
            const multiplier = order === 'asc' ? 1 : -1;
            if (aExternalId && bExternalId && productsByStoreIdByProductId) {
                const aSplittedId = aExternalId.external_id.split('/');
                const aProduct = productsByStoreIdByProductId[aSplittedId[0]]?.[aSplittedId[1]];
                const bSplittedId = aExternalId.external_id.split('/');
                const bProduct = productsByStoreIdByProductId[bSplittedId[0]]?.[bSplittedId[1]];

                if (aProduct && bProduct) {
                    return 1 * multiplier;
                }
            }

            return -1 * multiplier;
        },
    },
    {
        id: 'edit',
        headerText: 'Редактировать',
        align: 'right',
        component: Edit,
    },
];
