import type { ICategory } from '../../../models/Category';

export const catalogHref = (
    category: number | null,
    search: string,
    page = 1,
    sortBy?: 'price' | 'name' | null,
    sortOrder: 'asc' | 'desc' = 'asc',
) => {
    const params = new URLSearchParams();
    if (category) params.set('category', String(category));
    if (search.trim()) params.set('search', search.trim());
    if (page > 1) params.set('page', String(page));
    if (sortBy) {
        params.set('sort_by', sortBy);
        params.set('sort_order', sortOrder);
    }
    const query = params.toString();
    return `/catalog${query ? `?${query}` : ''}`;
};

export const visibleCategoryTree = (categories: ICategory[]) => {
    const categoriesById = new Map(categories.map((item) => [item.id, item]));
    const isVisible = (item: ICategory): boolean => {
        if (item.is_active === false) return false;
        if (item.parent === null) return true;
        const parent = categoriesById.get(item.parent);
        return Boolean(parent && isVisible(parent));
    };
    return categories.filter(isVisible).reduce<Record<string, ICategory[]>>((acc, item) => {
        const key = String(item.parent || 0);
        acc[key] = [...(acc[key] || []), item];
        return acc;
    }, {});
};
