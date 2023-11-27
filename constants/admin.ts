import { IAdminTab } from '../slices/Admin/interfaces';

export const ADMIN_TABS: IAdminTab[] = [
    { id: 'products', href: '/admin/products', text: 'Товары' },
    { id: 'categories', href: '/admin/categories', text: 'Категории', disabled: false },
    { id: 'news', href: '/admin/news', text: 'Новости', disabled: true },
];

export const EVOTOR_EXTERNAL_ID_DATA_SOURCE = 'evotor';

export const PRODUCT_UNIT_OPTIONS = [
    { id: 'KG', text: 'кг' },
    { id: 'PC', text: 'шт' },
];
