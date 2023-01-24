import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { IOrder } from '../../../../../models/Order';
import { FooterWrapper, StyledTableRow, Wrapper } from './styles';

interface IProps {
    order: IOrder;
}

/**
 * Компонент для отображения списка продуктов из заказа
 */
const OrderList: FC<IProps> = ({ order }) => {
    return (
        <Wrapper>
            <Paper>
                <TableContainer sx={{ width: '100%' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Наименование</TableCell>
                                <TableCell align="right">Кол-во</TableCell>
                                <TableCell align="right">Стоимость</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.order_data.products.map((element) => (
                                <StyledTableRow key={element.product.id}>
                                    <TableCell>{element.product.title}</TableCell>
                                    <TableCell align="right">{element.quantity}</TableCell>
                                    <TableCell align="right">{element.product.regular_price} ₽</TableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <TableCell>Доставка</TableCell>
                                <TableCell align="right">1</TableCell>
                                <TableCell align="right">{order.delivery_cost} ₽</TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <FooterWrapper>
                        Итого:<span>{order.total_sum_with_delivery} ₽</span>
                    </FooterWrapper>
                </div>
            </Paper>
        </Wrapper>
    );
};

export default OrderList;
