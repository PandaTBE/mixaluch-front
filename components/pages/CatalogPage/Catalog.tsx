import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ProductCard from '../../ProductCard/ProductCard';
import CategoryItem from './components/CategoryItem/CategoryItem';
import { ProductApi } from '../../../api/ProductApi';
import type { CatalogProps, CatalogResponse } from '../../../pages/catalog';
import { catalogHref, visibleCategoryTree } from './catalogNavigation';
import { pluralizeRu } from '../../../tools/commonTools';
import {
    Aside,
    CatalogGrid,
    CategoryTrigger,
    ContentWrapper,
    EmptyState,
    Heading,
    LoadMore,
    TreeList,
    Wrapper,
} from './styles';

const nextPageOf = (next: string | null) => {
    if (!next) return null;
    const page = Number(new URL(next, 'http://localhost').searchParams.get('page'));
    return Number.isInteger(page) && page > 0 ? page : null;
};

const Catalog = ({ data: initialData, categories, category, search, page, sortBy, sortOrder, error }: CatalogProps) => {
    const router = useRouter();
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const categoryTrigger = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<CatalogResponse | null>(initialData);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [restoreY, setRestoreY] = useState<number | null>(null);
    const loadingPage = useRef<{ key: string; page: number } | null>(null);
    const cacheKey = catalogHref(category, search, page, sortBy, sortOrder);
    const currentKey = useRef(cacheKey);
    currentKey.current = cacheKey;
    const { ref, inView } = useInView({ rootMargin: '320px 0px', threshold: 0 });
    const byParent = visibleCategoryTree(categories);
    const nextPage = nextPageOf(data?.next || null);

    useEffect(() => {
        loadingPage.current = null;
        setLoading(false);
        setData(initialData);
        setLoadError(false);
        setCategoriesOpen(false);
    }, [initialData, category, search, page, sortBy, sortOrder]);

    useEffect(() => {
        try {
            const saved = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
            if (saved && Date.now() - saved.savedAt < 300000 && Array.isArray(saved.data?.results)) {
                setData(saved.data);
                setRestoreY(saved.y);
            }
        } catch {
            /* Хранилище может быть недоступно; страница, отрисованная сервером, продолжает работать. */
        }
    }, [cacheKey]);

    useEffect(() => {
        if (restoreY === null) return;
        const frame = requestAnimationFrame(() => {
            window.scrollTo(0, restoreY);
            setRestoreY(null);
        });
        return () => cancelAnimationFrame(frame);
    }, [restoreY, data]);

    useEffect(() => {
        const save = () => {
            try {
                sessionStorage.setItem(cacheKey, JSON.stringify({ data, y: window.scrollY, savedAt: Date.now() }));
            } catch {
                /* Навигация должна работать и без доступа к хранилищу. */
            }
        };
        router.events.on('routeChangeStart', save);
        return () => router.events.off('routeChangeStart', save);
    }, [router.events, cacheKey, data]);

    const loadNext = async () => {
        if (!nextPage || loadingPage.current?.key === cacheKey || loadError) return;
        const request = { key: cacheKey, page: nextPage };
        loadingPage.current = request;
        setLoading(true);
        try {
            const response = await ProductApi.getProductsV2({
                category: category || undefined,
                search,
                page: nextPage,
                sortBy: sortBy || undefined,
                sortOrder,
            });
            if (currentKey.current !== request.key) return;
            setData((current) => {
                if (!current) return response;
                const seen = new Set(current.results.map((product) => product.id));
                return {
                    ...response,
                    results: [...current.results, ...response.results.filter((product) => !seen.has(product.id))],
                };
            });
        } catch {
            if (currentKey.current === request.key) setLoadError(true);
        } finally {
            if (loadingPage.current === request) loadingPage.current = null;
            if (currentKey.current === request.key) setLoading(false);
        }
    };

    useEffect(() => {
        if (inView && nextPage && !loading && !loadError) loadNext();
    }, [inView, nextPage, loading, loadError, sortBy, sortOrder]);

    const selectedName = categories.find((item) => item.id === category)?.name;
    const heading = search ? `Поиск: ${search}` : selectedName || 'Каталог продуктов';

    return (
        <Wrapper>
            <ContentWrapper>
                <Aside $open={categoriesOpen}>
                    <h2>Категории</h2>
                    <CategoryTrigger
                        ref={categoryTrigger}
                        type="button"
                        aria-expanded={categoriesOpen}
                        aria-controls="catalog-categories"
                        onClick={() => setCategoriesOpen((open) => !open)}
                    >
                        <GridViewIcon aria-hidden="true" />
                        <span>
                            <span>Категории</span>
                            <strong>{selectedName || 'Все товары'}</strong>
                        </span>
                        <ExpandMoreIcon aria-hidden="true" />
                    </CategoryTrigger>
                    <nav
                        id="catalog-categories"
                        aria-label="Категории товаров"
                        onClick={(event) => {
                            if (
                                categoriesOpen &&
                                !event.ctrlKey &&
                                !event.metaKey &&
                                !event.shiftKey &&
                                !event.altKey &&
                                (event.target as HTMLElement).closest('a')
                            ) {
                                setCategoriesOpen(false);
                                categoryTrigger.current?.focus();
                            }
                        }}
                    >
                        <Link href={catalogHref(null, '', 1, sortBy, sortOrder)}>
                            <a aria-current={category === null ? 'page' : undefined}>Все товары</a>
                        </Link>
                        <TreeList>
                            {(byParent['0'] || []).map((item) => (
                                <CategoryItem
                                    key={item.id}
                                    category={item}
                                    childrenByParent={byParent}
                                    selectedId={category}
                                    search=""
                                    hrefFor={(nextCategory, nextSearch) =>
                                        catalogHref(nextCategory, nextSearch, 1, sortBy, sortOrder)
                                    }
                                />
                            ))}
                        </TreeList>
                    </nav>
                </Aside>
                <div>
                    <Heading>
                        <div>
                            <h1>{heading}</h1>
                            <p>
                                {data
                                    ? `${data.count} ${pluralizeRu(data.count, ['товар', 'товара', 'товаров'])}`
                                    : 'Каталог'}
                            </p>
                        </div>
                        <FormControl className="catalog-sort" size="small">
                            <InputLabel id="catalog-sort-label">Сортировка</InputLabel>
                            <Select
                                labelId="catalog-sort-label"
                                id="catalog-sort"
                                value={`${sortBy}-${sortOrder}`}
                                label="Сортировка"
                                onChange={(event) => {
                                    const [nextSortBy, nextSortOrder] = event.target.value.split('-');
                                    router.push(
                                        catalogHref(
                                            category,
                                            search,
                                            1,
                                            (nextSortBy || null) as 'price' | 'name' | null,
                                            (nextSortOrder || 'asc') as 'asc' | 'desc',
                                        ),
                                    );
                                }}
                            >
                                <MenuItem value="price-desc">Сначала дороже</MenuItem>
                                <MenuItem value="price-asc">Сначала дешевле</MenuItem>
                                <MenuItem value="name-asc">По названию: А—Я</MenuItem>
                                <MenuItem value="name-desc">По названию: Я—А</MenuItem>
                            </Select>
                        </FormControl>
                    </Heading>
                    {error && (
                        <EmptyState role="alert">
                            <h2>Каталог недоступен</h2>
                            <p>{error}</p>
                            <button type="button" onClick={() => router.reload()}>
                                Повторить
                            </button>
                        </EmptyState>
                    )}
                    {!error && data?.results.length === 0 && (
                        <EmptyState>
                            <h2>Ничего не нашлось</h2>
                            <p>Попробуйте другое название или выберите все товары.</p>
                            <Link href="/catalog">
                                <a>Все товары</a>
                            </Link>
                        </EmptyState>
                    )}
                    {!error && data && data.results.length > 0 && (
                        <>
                            <CatalogGrid>
                                {data.results.map((product) => (
                                    <ProductCard key={product.id} product={product} imageHeight="220px" />
                                ))}
                            </CatalogGrid>
                            {nextPage && (
                                <LoadMore ref={ref} aria-live="polite">
                                    {loading && <span>Загружаем товары…</span>}
                                    {loadError && (
                                        <>
                                            <span role="alert">Не удалось загрузить следующую страницу.</span>
                                            <button type="button" onClick={() => setLoadError(false)}>
                                                Повторить
                                            </button>
                                        </>
                                    )}
                                    <Link href={catalogHref(category, search, nextPage, sortBy, sortOrder)}>
                                        <a>Следующая страница</a>
                                    </Link>
                                </LoadMore>
                            )}
                        </>
                    )}
                </div>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Catalog;
