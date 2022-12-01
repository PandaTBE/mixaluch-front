import useGetUserData from '../../hooks/useGetUserData';
import usePrepareData from '../../hooks/usePrepareData';
import { useGetRawData as useCartRawData } from '../CartPage/hooks/useGetRawData';

/**
 * Функция для получения начальных данных
 */
const DataComponent = () => {
    useCartRawData();
    usePrepareData();
    useGetUserData();
    return null;
};

export default DataComponent;
