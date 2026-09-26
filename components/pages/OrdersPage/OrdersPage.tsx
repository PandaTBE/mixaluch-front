import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { OrdersContentSkeleton } from '../../LoadingSkeleton/components/OrdersPageSkeleton/OrdersPageSkeleton';
import { useSelector } from 'react-redux';
import { orderStatusMap } from '../../../slices/Order/constants/constants';
import { orderReducerValues } from '../../../slices/Order/order';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import PageTitle from '../../PageTitle/PageTitle';
import useFetchData from './hooks/useFetchData';
import {
    ErrorWrapper,
    OrderNumber,
    OrdersTableWrapper,
    StyledTableRow,
    TablePanel,
    StyledTableContainer,
    Wrapper,
} from './styles';

/**
 * Компонент для отображения истории заказов
 */
const OrdersPage = () => {
    const { orders, ordersFetching, ordersFetchingError } = useSelector(orderReducerValues);
    useFetchData();
    return (
        <Wrapper>
            <PageTitle text={'История заказов'} />
            {(ordersFetching || (orders === null && !ordersFetchingError)) && (
                <span className="visually-hidden" role="status">
                    Загрузка истории заказов…
                </span>
            )}
            <OrdersTableWrapper aria-busy={ordersFetching || (orders === null && !ordersFetchingError)}>
                {orders === null && !ordersFetchingError && <OrdersContentSkeleton />}
                {ordersFetchingError && (
                    <ErrorWrapper>
                        <ErrorMessage text={'Ошибка при получении истории заказов'} />
                    </ErrorWrapper>
                )}

                {orders?.length ? (
                    <TablePanel elevation={0}>
                        <StyledTableContainer>
                            <Table aria-label="История заказов">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата оформления</TableCell>
                                        <TableCell align="right">№ заказа</TableCell>
                                        <TableCell align="right">Статус</TableCell>
                                        <TableCell align="right">Сумма заказа</TableCell>
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
                                            <TableCell align="right">{order.total_sum_with_delivery} ₽</TableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    </TablePanel>
                ) : orders !== null && !ordersFetchingError ? (
                    <div>У Вас пока нет заказов</div>
                ) : null}
            </OrdersTableWrapper>
        </Wrapper>
    );
};

export default OrdersPage;
