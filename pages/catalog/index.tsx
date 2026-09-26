import type { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import CatalogPage from '../../components/pages/CatalogPage/Catalog';
import { ProductApi } from '../../api/ProductApi';
import { CategoryApi } from '../../api/CategoryApi';
import type { IProductCard } from '../../models/Product';
import type { ICategory } from '../../models/Category';

export interface CatalogResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IProductCard[];
}

export interface CatalogProps {
    data: CatalogResponse | null;
    categories: ICategory[];
    category: number | null;
    search: string;
    page: number;
    sortBy: 'price' | 'name' | null;
    sortOrder: 'asc' | 'desc';
    error: string | null;
}

const Catalog: NextPage<CatalogProps> = (props) => {
    const selected = props.categories.find((item) => item.id === props.category);
    const title = selected ? `${selected.name} — У Михалыча` : 'Каталог продуктов — У Михалыча';
    return (
        <MainLayout
            title={title}
            description={
                selected
                    ? `Товары категории ${selected.name} в магазине У Михалыча`
                    : 'Каталог продуктов магазина У Михалыча'
            }
        >
            <CatalogPage {...props} />
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps<CatalogProps> = async ({ query, res }) => {
    const rawCategory = Array.isArray(query.category) ? query.category[0] : query.category;
    const rawSearch = Array.isArray(query.search) ? query.search[0] : query.search;
    const rawPage = Array.isArray(query.page) ? query.page[0] : query.page;
    const rawSortBy = Array.isArray(query.sort_by) ? query.sort_by[0] : query.sort_by;
    const rawSortOrder = Array.isArray(query.sort_order) ? query.sort_order[0] : query.sort_order;
    const category = rawCategory ? Number(rawCategory) : null;
    const page = rawPage ? Number(rawPage) : 1;
    const search = (rawSearch || '').trim();
    const sortBy = rawSortBy === undefined ? 'price' : rawSortBy === 'price' || rawSortBy === 'name' ? rawSortBy : null;
    const sortOrder: 'asc' | 'desc' =
        rawSortOrder === 'asc' || rawSortOrder === 'desc' ? rawSortOrder : sortBy === 'price' ? 'desc' : 'asc';
    const invalid =
        Boolean(rawCategory && (!Number.isInteger(category) || (category !== null && category <= 0))) ||
        !Number.isInteger(page) ||
        page <= 0 ||
        search.length > 100 ||
        (rawSortBy !== undefined && !sortBy) ||
        (rawSortOrder !== undefined && !['asc', 'desc'].includes(rawSortOrder));

    if (invalid) {
        res.statusCode = 400;
        return {
            props: {
                data: null,
                categories: [],
                category: null,
                search,
                page: 1,
                sortBy,
                sortOrder,
                error: 'Некорректные параметры каталога.',
            },
        };
    }

    try {
        const [data, categories] = await Promise.all([
            ProductApi.getProductsV2({
                category: category || undefined,
                search,
                page,
                sortBy: sortBy || undefined,
                sortOrder,
            }),
            CategoryApi.getCategories(),
        ]);
        return { props: { data, categories, category, search, page, sortBy, sortOrder, error: null } };
    } catch (error) {
        res.statusCode = axios.isAxiosError(error) ? error.response?.status || 503 : 503;
        return {
            props: {
                data: null,
                categories: [],
                category,
                search,
                page,
                sortBy,
                sortOrder,
                error: 'Не удалось загрузить каталог. Попробуйте обновить страницу.',
            },
        };
    }
};

export default Catalog;
