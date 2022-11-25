import { Stack } from '@mui/system';
import { isNumber } from 'lodash';
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { MinusButton, PlusButton, StyledInput } from './styles';

interface IProps {
    defaultValue?: number;
}

const QuantityInput: FC<IProps> = ({ defaultValue = 1 }) => {
    const [quantity, setQuantity] = useState<string | number>(defaultValue);
    const debouncedQuantityValue = useDebounce(quantity, 500);

    useEffect(() => {
        if (debouncedQuantityValue && isNaN(Number(debouncedQuantityValue))) {
            setQuantity(1);
        }
    }, [debouncedQuantityValue]);

    const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    return (
        <Stack direction="row">
            <MinusButton>-</MinusButton>
            <StyledInput onChange={onQuantityChange} value={quantity} />
            <PlusButton>+</PlusButton>
        </Stack>
    );
};

export default QuantityInput;
