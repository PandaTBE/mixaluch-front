import { Alert, Button, LinearProgress, MenuItem, Paper, Stack, Table, TableContainer, TablePagination, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { IProduct } from '../../../../models/Product';
import useDebounce from '../../../../hooks/useDebounce';
import { TOrder } from './interfaces';
import TableHeader from './components/TableHeader/TableHeader';
import TableBody from './components/TableBody/TableBody';
import { useRouter } from 'next/router';
import { storeProductsByStoreId, storeStores } from '../../../../slices/Evotor/evotor';
import { categoryReducerValues, storeCategories } from '../../../../slices/Category/category';
import { userReducerValues } from '../../../../slices/User/user';
import { productApi } from '../../../../services/ProductService';
import { CategoryApi } from '../../../../api/CategoryApi';
import { AdminProductsApi } from '../../../../api/admin/products/AdminProductsApi';

const AdminProductsPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { categories } = useSelector(categoryReducerValues);
    const { authToken } = useSelector(userReducerValues);
    const [orderBy, setOrderBy] = useState<keyof IProduct>('title');
    const [order, setOrder] = useState<TOrder>('asc');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(0);
    const [categoryError, setCategoryError] = useState(false);
    const [evotorStatus, setEvotorStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const debouncedFilter = useDebounce(filter, 300);
    const { currentData, isFetching, isError, refetch } = productApi.useGetAdminProductsQuery({
        page: page + 1,
        page_size: rowsPerPage,
        search: debouncedFilter,
        category: category ? Number(category) : undefined,
        sort_by: orderBy,
        sort_order: order,
    }, { skip: !authToken, refetchOnMountOrArgChange: true });

    useEffect(() => {
        let active = true;
        CategoryApi.getCategories().then((data) => {
            if (active) dispatch(storeCategories(data));
        }).catch(() => {
            if (active) setCategoryError(true);
        });
        return () => { active = false; };
    }, [dispatch]);

    useEffect(() => {
        if (!authToken) return;
        let active = true;
        setEvotorStatus('loading');
        dispatch(storeProductsByStoreId(null));
        dispatch(storeStores([]));
        AdminProductsApi.getEvotorData(authToken).then((data) => {
            if (!active) return;
            dispatch(storeStores(data.stores));
            dispatch(storeProductsByStoreId(data.productsByStoreId));
            setEvotorStatus('ready');
        }).catch(() => {
            if (active) setEvotorStatus('error');
        });
        return () => { active = false; };
    }, [authToken, dispatch]);

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(event.target.value));
        setPage(0);
    };

    const onHeaderCellClick = (key: keyof IProduct | null) => () => {
        if (key && ['title', 'category', 'regular_price'].includes(key)) {
            setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc');
            setOrderBy(key);
            setPage(0);
        }
    };

    return (
        <>
            <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
                <TextField value={filter} onChange={(event) => { setFilter(event.target.value); setPage(0); }}
                    label="Поиск по товарам" variant="outlined" />
                <TextField select value={category} label="Категория" sx={{ minWidth: 220 }}
                    onChange={(event) => { setCategory(event.target.value); setPage(0); }}>
                    <MenuItem value="">Все категории</MenuItem>
                    {categories?.map((item) => <MenuItem key={item.id} value={String(item.id)}>{item.name}</MenuItem>)}
                </TextField>
                <Button variant="contained" onClick={() => router.push('/admin/products/add-new')}>
                    Добавить новый товар
                </Button>
            </Stack>
            {categoryError && <Alert severity="warning">Не удалось загрузить категории. Обновите страницу для повторной попытки.</Alert>}
            {evotorStatus === 'loading' && <Alert severity="info">Загружаются данные Эвотор. Каталог уже доступен для работы.</Alert>}
            {evotorStatus === 'error' && <Alert severity="warning">Данные Эвотор недоступны. Редактирование каталога работает.</Alert>}
            {isError && <Alert severity="error" action={<Button color="inherit" onClick={() => refetch()}>Повторить</Button>}>
                Не удалось загрузить товары. Проверьте подключение и права доступа.
            </Alert>}
            {isFetching && <LinearProgress aria-label="Загрузка товаров" />}
            {!isFetching && !isError && currentData?.count === 0 && <Alert severity="info">Товары не найдены.</Alert>}
            <TableContainer sx={{ maxHeight: '65vh', marginTop: '20px' }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Товары" aria-busy={isFetching}>
                    <TableHeader onHeaderCellClick={onHeaderCellClick} order={order} orderBy={orderBy} />
                    <TableBody products={isError ? [] : currentData?.results || []} />
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[10, 25, 100]} onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={(_, newPage) => setPage(newPage)} count={currentData?.count ?? -1}
                rowsPerPage={rowsPerPage} component="div" page={page} labelRowsPerPage="Строк на странице"
                backIconButtonProps={{ disabled: isFetching || filter !== debouncedFilter || page === 0 }}
                nextIconButtonProps={{ disabled: isFetching || filter !== debouncedFilter || !currentData?.next }} />
        </>
    );
};

export default AdminProductsPage;
