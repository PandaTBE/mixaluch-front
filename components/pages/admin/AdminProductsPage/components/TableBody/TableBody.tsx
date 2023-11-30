import { FC } from 'react';
import { IProps } from './interfaces';
import { TableBody as FluentTableBody } from '@mui/material';
import Row from './components/Row/Row';

/**
 * Тело таблицы
 */
const TableBody: FC<IProps> = ({ products }) => {
    return (
        <FluentTableBody>
            {products.map((product) => (
                <Row key={product.id} product={product} />
            ))}
        </FluentTableBody>
    );
};

export default TableBody;
