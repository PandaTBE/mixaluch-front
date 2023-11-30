import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { COLUMNS } from '../../constants/constants';
import { FC } from 'react';
import { IProps } from './interfaces';

/**
 * Шапка таблицы
 */
const TableHeader: FC<IProps> = ({ order, orderBy, onHeaderCellClick }) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {COLUMNS.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                        <TableSortLabel
                            direction={orderBy === column.key ? order : 'asc'}
                            onClick={onHeaderCellClick(column.key || null)}
                            active={orderBy === column.key}
                            disabled={column.isSortDisabled || !column.sortHandler}
                        >
                            {column.headerText}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default TableHeader;
