import useGetUserData from '../../hooks/useGetUserData';
import usePrepareData from '../../hooks/usePrepareData';
import { usePrepareData as useCartPrepareData } from '../CartPage/hooks/usePrepareData';

/**
 * Функция для получения начальных данных
 */
const DataComponent = () => {
    useCartPrepareData();
    usePrepareData();
    useGetUserData();
    return null;
};

export default DataComponent;
