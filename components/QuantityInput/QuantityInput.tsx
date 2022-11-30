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

    const onButtonClick = (type: 'minus' | 'plus') => () => {
        switch (type) {
            case 'minus':
                if (Number(quantity) > 0.1) {
                    setQuantity((prevValue) => Number(prevValue) - 0.1);
                }
                break;
            case 'plus':
                setQuantity((prevValue) => Number(prevValue) + 0.1);

                break;

            default:
                break;
        }
    };

    return (
        <Stack direction="row">
            <MinusButton onClick={onButtonClick('minus')}>-</MinusButton>
            <StyledInput onChange={onChange} value={Number(quantity).toFixed(1)} />
            <PlusButton onClick={onButtonClick('plus')}>+</PlusButton>
        </Stack>
    );
};

export default QuantityInput;
