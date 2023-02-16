import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { DateTime } from 'luxon';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { orderStatusMap } from '../../../slices/Order/constants/constants';
import { orderReducerValues } from '../../../slices/Order/order';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import PageTitle from '../../PageTitle/PageTitle';
import useFetchData from './hooks/useFetchData';
import { ErrorWrapper, OrderNumber, OrdersTableWrapper, StyledTableRow, Wrapper } from './styles';

/**
 * Компонент для отображения истории заказов
 */
const OrdersPage = () => {
    const { orders, ordersFetching, ordersFetchingError } = useSelector(orderReducerValues);
    useFetchData();
    return (
        <Wrapper>
            <PageTitle text={'История заказов'} />
            <OrdersTableWrapper>
                {ordersFetching && <Skeleton height={200} />}
                {ordersFetchingError && (
                    <ErrorWrapper>
                        <ErrorMessage text={'Ошибка при получении истории заказов'} />
                    </ErrorWrapper>
                )}

                {orders?.length ? (
                    <Paper>
                        <TableContainer sx={{ width: '100%' }}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата оформления</TableCell>
                                        <TableCell align="right">№ заказа</TableCell>
                                        <TableCell align="right">Статус</TableCell>
                                        <TableCell sx={{ display: 'none' }} align="right">
                                            Сумма заказа
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <StyledTableRow key={order.id}>
                                            <TableCell>
                                                {DateTime.fromISO(order.created_at).toFormat('dd.MM.yyyy HH:mm')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link href={`/orders/${order.id}`}>
                                                    <OrderNumber>{order.id}</OrderNumber>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">
                                                {orderStatusMap[order.status] || order.status}
                                            </TableCell>
                                            <TableCell sx={{ display: 'none' }} align="right">
                                                {order.total_sum_with_delivery} ₽
                                            </TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) : (
                    <div>У Вас пока нет заказов</div>
                )}
            </OrdersTableWrapper>
        </Wrapper>
    );
};

export default OrdersPage;
