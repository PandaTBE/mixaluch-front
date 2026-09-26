import { SkeletonPaper, SkeletonTableContainer } from '../styles';
import { OrderDataValue } from './styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { StyledTitle } from '../../../PageTitle/styles';
import { StyledDivider, SubTitle, Wrapper } from '../../../pages/OrderInfoPage/styles';
import { InfoWrapper, OrderDataKey } from '../../../pages/OrderInfoPage/components/OrderInfo/styles';
import {
    FooterWrapper,
    StyledTableRow,
    Wrapper as ListWrapper,
} from '../../../pages/OrderInfoPage/components/OrderList/styles';

const OrderInfoPageSkeleton = () => (
    <Wrapper aria-hidden="true">
        <StyledTitle>
            Заказ № <Skeleton width={90} />
        </StyledTitle>
        <SubTitle>Информация о заказе</SubTitle>
        <StyledDivider />
        {[
            'Дата оформления',
            'Статус заказа',
            'Сумма заказа',
            'Способ оплаты',
            'Способ доставки',
            'Получатель',
            'Телефон',
        ].map((label) => (
            <InfoWrapper key={label}>
                <OrderDataKey>{label}</OrderDataKey>
                <OrderDataValue>
                    <Skeleton />
                </OrderDataValue>
            </InfoWrapper>
        ))}
        <StyledDivider />
        <SubTitle>Состав заказа</SubTitle>
        <ListWrapper>
            <SkeletonPaper elevation={0}>
                <SkeletonTableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование</TableCell>
                                <TableCell align="right">Кол-во</TableCell>
                                <TableCell align="right">Стоимость</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[0, 1, 2].map((row) => (
                                <StyledTableRow key={row}>
                                    {[0, 1, 2].map((column) => (
                                        <TableCell key={column}>
                                            <Skeleton />
                                        </TableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </SkeletonTableContainer>
                <FooterWrapper>
                    Итого:
                    <span>
                        <Skeleton width={80} />
                    </span>
                </FooterWrapper>
            </SkeletonPaper>
        </ListWrapper>
    </Wrapper>
);

export default OrderInfoPageSkeleton;
