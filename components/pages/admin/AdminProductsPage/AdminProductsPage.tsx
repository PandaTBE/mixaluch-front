import { Button, Paper, Stack, Table, TableContainer, TablePagination, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { productReducerValues } from '../../../../slices/Product/product';
import { ChangeEvent, useEffect, useState } from 'react';
import { COLUMNS } from './constants/constants';
import { IProduct } from '../../../../models/Product';
import useDebounce from '../../../../hooks/useDebounce';
import { TOrder } from './interfaces';
import { cloneDeep } from 'lodash';
import TableHeader from './components/TableHeader/TableHeader';
import TableBody from './components/TableBody/TableBody';
import { useRouter } from 'next/router';
import { evotorReducerValues } from '../../../../slices/Evotor/evotor';

/**
 * Отображение таблицы со всеми товарами
 */
const AdminProductsPage = () => {
    const { productsByStoreIdByProductId } = useSelector(evotorReducerValues);
    const { products } = useSelector(productReducerValues);

    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
    const [orderBy, setOrderBy] = useState<keyof IProduct>('title');
    const [order, setOrder] = useState<TOrder>('asc');

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);

    const debouncedFilter = useDebounce(filter, 300);
    const router = useRouter();

    useEffect(() => {
        if (sortedProducts?.length) {
            setFilteredProducts(
                sortedProducts.filter((product) => product.title.toLowerCase().includes(debouncedFilter.toLowerCase())),
            );
        }
    }, [debouncedFilter, sortedProducts]);

    useEffect(() => {
        if (products?.length) {
            const currentColumnForSort = COLUMNS.find((column) => column.key === orderBy);

            setSortedProducts(
                cloneDeep(products).sort((a, b) =>
                    currentColumnForSort?.sortHandler
                        ? currentColumnForSort?.sortHandler(a, b, order, productsByStoreIdByProductId)
                        : 0,
                ),
            );
        }
    }, [order, orderBy, products]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const onHeaderCellClick = (key: keyof IProduct | null) => () => {
        if (key) {
            const isAsc = orderBy === key && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(key);
        }
    };

    const addNewClick = () => {
        router.push(`products/add-new`);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" gap={2}>
                <TextField value={filter} onChange={onFilterChange} label="Поиск по товарам" variant="outlined" />
                <Button variant="contained" onClick={addNewClick}>
                    Добавить новый товар
                </Button>
            </Stack>
            <TableContainer sx={{ maxHeight: '65vh', marginTop: '20px' }} component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader onHeaderCellClick={onHeaderCellClick} order={order} orderBy={orderBy} />
                    <TableBody
                        products={filteredProducts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                    />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                onPageChange={handleChangePage}
                count={products?.length || 0}
                rowsPerPage={rowsPerPage}
                component="div"
                page={page}
                labelRowsPerPage={'Строк на странице'}
            />
        </>
    );
};

export default AdminProductsPage;
