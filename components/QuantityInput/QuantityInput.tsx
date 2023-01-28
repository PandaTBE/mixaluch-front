import { Stack } from '@mui/system';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { updateCartItem } from '../../slices/Cart/cart';
import useFetchData from './hooks/useFetchData';
import { MinusButton, PlusButton, StyledInput } from './styles';

interface IProps {
    /** Id товара в коризне */
    cartItemId?: number;
    /** Дефотное значение */
    defaultValue?: number;
    /** Id товара */
    productId: number;
}

/**
 * Компонент для отображения поля ввода количества товара
 */
const QuantityInput: FC<IProps> = ({ productId, defaultValue = 1, cartItemId }) => {
    const [quantity, setQuantity] = useState<string | number>(defaultValue);
    const debouncedQuantityValue = useDebounce(quantity, 2000);
    const { patchCartItem } = useFetchData();
    const dispatch = useDispatch();

    useEffect(() => {
        if (quantity && (!isNaN(Number(quantity)) || !Number(quantity < 0.2))) {
            dispatch(updateCartItem({ productId, quantity: Number(quantity) }));
        }
    }, [quantity]);

    useEffect(() => {
        if (debouncedQuantityValue && (isNaN(Number(debouncedQuantityValue)) || Number(debouncedQuantityValue < 0.2))) {
            setQuantity(1);
        } else {
            if (debouncedQuantityValue) {
                patchCartItem(Number(debouncedQuantityValue), cartItemId);
            }
        }
    }, [debouncedQuantityValue]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value.replace(',', '.'));
    };

    const onButtonClick = (type: 'minus' | 'plus', currentQuantity: number) => () => {
        switch (type) {
            case 'minus':
                if (Number(currentQuantity) > 0.3) {
                    setQuantity((currentQuantity - 0.1).toFixed(1));
                }
                break;
            case 'plus':
                setQuantity((currentQuantity + 0.1).toFixed(1));
                break;

            default:
                break;
        }
    };

    return (
        <Stack direction="row">
            <MinusButton onClick={onButtonClick('minus', Number(quantity))}>-</MinusButton>
            <StyledInput onChange={onChange} value={quantity} />
            <PlusButton onClick={onButtonClick('plus', Number(quantity))}>+</PlusButton>
        </Stack>
    );
};

export default QuantityInput;
