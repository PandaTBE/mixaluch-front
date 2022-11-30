import { Stack } from '@mui/system';
import { isNumber } from 'lodash';
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { MinusButton, PlusButton, StyledInput } from './styles';

interface IProps {
    defaultValue?: number;
    onQuantityChange: (quantity: number) => void;
}

const QuantityInput: FC<IProps> = ({ defaultValue = 1, onQuantityChange }) => {
    const [quantity, setQuantity] = useState<string | number>(defaultValue);
    const debouncedQuantityValue = useDebounce(quantity, 2000);

    useEffect(() => {
        if (debouncedQuantityValue && (isNaN(Number(debouncedQuantityValue)) || Number(debouncedQuantityValue < 0.2))) {
            setQuantity(1);
        } else {
            if (debouncedQuantityValue) {
                onQuantityChange(Number(debouncedQuantityValue));
            }
        }
    }, [debouncedQuantityValue]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    return (
        <Stack direction="row">
            <MinusButton>-</MinusButton>
            <StyledInput onChange={onChange} value={quantity} />
            <PlusButton>+</PlusButton>
        </Stack>
    );
};

export default QuantityInput;
