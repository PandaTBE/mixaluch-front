import { Tooltip } from '@mui/material';
import { InfoButton, InfoIcon, Label } from './styles';

const NegotiablePrice = () => (
    <Label>
        Договорная цена
        <Tooltip
            title="Стоимость согласуется с менеджером. Товар можно добавить в корзину, его цена не включается в итоговую сумму."
            describeChild
            arrow
        >
            <InfoButton aria-label="Что такое договорная цена?" size="small">
                <InfoIcon />
            </InfoButton>
        </Tooltip>
    </Label>
);

export default NegotiablePrice;
