import useFetchData from './hooks/useFetchData';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { MinusButton, PlusButton, StyledInput } from './styles';
import { Stack } from '@mui/system';
import { updateCartItem } from '../../slices/Cart/cart';
import { useDispatch } from 'react-redux';
import { TProductUnit } from '../../models/Product';
import useDebounce from '../../hooks/useDebounce';

interface IProps {
    /** Id товара в корзине */
    cartItemId?: number;
    /** Дефолтное значение */
    defaultValue?: number;
    /** Id товара */
    productId: number;
    /** Минимальное значение количества товара */
    minQuantityValue: number;
    /** Единица измерения товара */
    unit: TProductUnit;
}

/**
 * Компонент для отображения поля ввода количества товара
 */
const QuantityInput: FC<IProps> = ({ productId, cartItemId, unit, minQuantityValue, defaultValue = 1 }) => {
    const [quantity, setQuantity] = useState<string | number>(
        defaultValue > minQuantityValue ? defaultValue : minQuantityValue,
    );
    const debouncedQuantityValue = useDebounce(quantity, 2000);
    const didMount = useRef(false);
    const { patchCartItem } = useFetchData();
    const dispatch = useDispatch();

    /** Патч элемента корзины на сервер */
    useEffect(() => {
        if (didMount.current) {
            if (isFinite(Number(debouncedQuantityValue)) && !(Number(debouncedQuantityValue) < minQuantityValue)) {
                patchCartItem(Number(debouncedQuantityValue), cartItemId);
            }
        } else {
            didMount.current = true;
        }
    }, [debouncedQuantityValue]);

    /** Изменение значения в стейте */
    useEffect(() => {
        if (isFinite(Number(quantity)) && !(Number(quantity) < minQuantityValue)) {
            dispatch(updateCartItem({ productId, quantity: Number(quantity) }));
        }
    }, [quantity, unit, minQuantityValue]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value.replace(',', '.');

        if (isFinite(Number(value)) && unit === 'PC' && value) {
            value = Math.round(Number(value));
        }
        setQuantity(value);
    };

    /** Срабатывает при анфокусе поля ввода */
    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (!isFinite(value) || value < minQuantityValue) {
            setQuantity(minQuantityValue);
            // patchCartItem(minQuantityValue, cartItemId);
        }
    };

    const onButtonClick = (type: 'minus' | 'plus', currentQuantity: number) => () => {
        const value = unit === 'PC' ? 1 : 0.1;
        switch (type) {
            case 'minus':
                if (Number(currentQuantity) - value >= minQuantityValue) {
                    setQuantity((currentQuantity - value).toFixed(1));
                }
                break;
            case 'plus':
                setQuantity((currentQuantity + value).toFixed(1));
                break;

            default:
                break;
        }
    };

    return (
        <Stack direction="row">
            <MinusButton onClick={onButtonClick('minus', Number(quantity))}>-</MinusButton>
            <StyledInput onBlur={onBlur} onChange={onChange} value={quantity} />
            <PlusButton onClick={onButtonClick('plus', Number(quantity))}>+</PlusButton>
        </Stack>
    );
};

export default QuantityInput;
