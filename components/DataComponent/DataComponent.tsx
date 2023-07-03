import useGetImportantNews from '../../hooks/useGetImportantNews';
import useGetUserData from '../../hooks/useGetUserData';
import usePrepareData from '../../hooks/usePrepareData';
import { useGetRawData as useCartRawData } from '../pages/CartPage/hooks/useFetchData';

/**
 * Функция для получения начальных данных
 */
const DataComponent = () => {
    useGetImportantNews();
    useCartRawData();
    usePrepareData();
    useGetUserData();
    return null;
};

export default DataComponent;
