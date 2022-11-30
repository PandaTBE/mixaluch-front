import { Stack } from '@mui/system';
import { isNumber } from 'lodash';
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { updateCartItem } from '../../slices/Cart/cart';
import { MinusButton, PlusButton, StyledInput } from './styles';

interface IProps {
    defaultValue?: number;
    productId: number;
}

const QuantityInput: FC<IProps> = ({ productId, defaultValue = 1 }) => {
    const [quantity, setQuantity] = useState<string | number>(defaultValue);
    const debouncedQuantityValue = useDebounce(quantity, 2000);
    const dispatch = useDispatch();

    useEffect(() => {
        if (debouncedQuantityValue && (isNaN(Number(debouncedQuantityValue)) || Number(debouncedQuantityValue < 0.2))) {
            setQuantity(1);
        } else {
            if (debouncedQuantityValue && Number(debouncedQuantityValue) !== defaultValue) {
                dispatch(updateCartItem({ productId, quantity: Number(debouncedQuantityValue) }));
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
