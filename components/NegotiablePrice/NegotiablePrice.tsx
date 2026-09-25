import { IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styled from 'styled-components';

const Label = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    white-space: nowrap;

    @media (max-width: 400px) {
        gap: 2px;
        font-size: 12px;
    }
`;

const NegotiablePrice = () => (
    <Label>
        Договорная цена
        <Tooltip
            title="Стоимость согласуется с менеджером. Товар можно добавить в корзину, его цена не включается в итоговую сумму."
            describeChild
            arrow
        >
            <IconButton
                aria-label="Что такое договорная цена?"
                size="small"
                sx={{ color: 'inherit', padding: '4px' }}
            >
                <InfoOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
        </Tooltip>
    </Label>
);

export default NegotiablePrice;
