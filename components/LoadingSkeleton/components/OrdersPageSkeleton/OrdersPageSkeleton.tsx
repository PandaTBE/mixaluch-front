import { SkeletonPaper, SkeletonTableContainer } from '../styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../../../PageTitle/PageTitle';
import { OrdersTableWrapper, StyledTableRow, Wrapper } from '../../../pages/OrdersPage/styles';
import { AccountSkeletonLayout } from '../UserAccountPageSkeleton/UserAccountPageSkeleton';

export const OrdersContentSkeleton = () => (
    <SkeletonPaper elevation={0} aria-hidden="true">
        <SkeletonTableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Дата оформления</TableCell>
                        <TableCell align="right">№ заказа</TableCell>
                        <TableCell align="right">Статус</TableCell>
                        <TableCell align="right">Сумма заказа</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[0, 1, 2].map((row) => (
                        <StyledTableRow key={row}>
                            {[0, 1, 2, 3].map((column) => (
                                <TableCell key={column} align={column ? 'right' : 'left'}>
                                    <Skeleton />
                                </TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </SkeletonTableContainer>
    </SkeletonPaper>
);

const OrdersPageSkeleton = () => (
    <AccountSkeletonLayout>
        <Wrapper>
            <PageTitle text="История заказов" />
            <OrdersTableWrapper>
                <OrdersContentSkeleton />
            </OrdersTableWrapper>
        </Wrapper>
    </AccountSkeletonLayout>
);

export default OrdersPageSkeleton;
