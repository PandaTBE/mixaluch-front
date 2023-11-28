import { Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { COLUMNS } from '../../../../constants/constants';
import { FC, useMemo, useState } from 'react';
import { IProps } from './interfaces';
import { useSelector } from 'react-redux';
import { evotorReducerValues } from '../../../../../../../slices/Evotor/evotor';
import { IEvotorProduct } from '../../../../../../../models/Evotor';
import { CollapsedContentWrapper } from './styles';
import EvotorProductData from '../../../EvotorProductData/EvotorProductData';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../../../constants/admin';

const Row: FC<IProps> = ({ product }) => {
    const { productsByStoreIdByProductId } = useSelector(evotorReducerValues);

    const [open, setOpen] = useState(false);

    const evotorProduct: null | IEvotorProduct = useMemo(() => {
        const externalId = product.external_ids.find((item) => item.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE);
        if (externalId && productsByStoreIdByProductId) {
            const splittedId = externalId.external_id.split('/');
            const product = productsByStoreIdByProductId[splittedId[0]]?.[splittedId[1]];

            return product || null;
        }

        return null;
    }, []);

    return (
        <>
            <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {COLUMNS.map((column) => {
                    return (
                        <TableCell key={column.id} align={column.align}>
                            {column.component ? (
                                <column.component product={product} />
                            ) : column.key ? (
                                JSON.stringify(product[column.key])
                            ) : null}
                        </TableCell>
                    );
                })}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={COLUMNS.length + 1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <CollapsedContentWrapper>
                            {evotorProduct ? (
                                <EvotorProductData evotorProduct={evotorProduct} />
                            ) : (
                                <div>Нет связи с товаром из эвотор</div>
                            )}
                        </CollapsedContentWrapper>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default Row;
