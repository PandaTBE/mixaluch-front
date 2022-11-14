import useGetUserData from '../../hooks/useGetUserData';
import usePrepareData from '../../hooks/usePrepareData';

/**
 * Функция для получения начальных данных
 */
const DataComponent = () => {
    usePrepareData();
    useGetUserData();
    return null;
};

export default DataComponent;
