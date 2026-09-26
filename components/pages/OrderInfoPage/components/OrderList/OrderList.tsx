import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FC } from 'react';
import { IOrder } from '../../../../../models/Order';
import { FooterWrapper, StyledTableRow, TablePanel, StyledTableContainer, Wrapper } from './styles';
import { formatProductPrice } from '../../../../../tools/productPrice';

interface IProps {
    order: IOrder;
}

/**
 * Компонент для отображения списка продуктов из заказа
 */
const OrderList: FC<IProps> = ({ order }) => {
    return (
        <Wrapper>
            <TablePanel elevation={0}>
                <StyledTableContainer>
                    <Table aria-label="Состав заказа">
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
                                    <TableCell align="right">{formatProductPrice(element.product)}</TableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <TableCell>Доставка</TableCell>
                                <TableCell align="right">1</TableCell>
                                <TableCell align="right">{order.delivery_cost} ₽</TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </StyledTableContainer>
                <div>
                    <FooterWrapper>
                        Итого:<span>{order.total_sum_with_delivery} ₽</span>
                    </FooterWrapper>
                    {order.order_data.products.some((item) => item.product.is_negotiable_price) && (
                        <p>Товары с договорной ценой не включены в итог. Их стоимость согласуем отдельно.</p>
                    )}
                </div>
            </TablePanel>
        </Wrapper>
    );
};

export default OrderList;
