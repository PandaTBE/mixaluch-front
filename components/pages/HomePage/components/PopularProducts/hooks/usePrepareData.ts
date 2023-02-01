import { useEffect, useState } from 'react';
import useWindowSize from '../../../../../../hooks/useWindowSize';

/**
 * кастомный хук для подготовки данных
 */
const usePrepareData = () => {
    const [swiperData, setSwiperData] = useState({
        imageHeight: '230px',
    });
    const windowSize = useWindowSize();

    /** В зависимости от размеров окна изменяется состояние карусели с популярными продуктами */
    useEffect(() => {
        const { width } = windowSize;

        if (width >= 1400) {
            setSwiperData((prevState) => ({
                ...prevState,
                imageHeight: '230px',
            }));
        }

        if (width < 1400 && width >= 1200) {
            setSwiperData((prevState) => ({
                ...prevState,
                imageHeight: '220px',
            }));
        }

        if (width < 1200 && width >= 991) {
            setSwiperData((prevState) => ({
                ...prevState,

                imageHeight: '220px',
            }));
        }

        if (width < 991 && width >= 787) {
            setSwiperData((prevState) => ({
                ...prevState,
                imageHeight: '220px',
            }));
        }
        if (width < 787 && width >= 635) {
            setSwiperData((prevState) => ({
                ...prevState,
                imageHeight: '150px',
            }));
        }

        if (width < 635 && width >= 450) {
            setSwiperData((prevState) => ({
                ...prevState,
                imageHeight: '180px',
            }));
        }

        if (width < 450) {
            setSwiperData((prevState) => ({
                ...prevState,
                imageHeight: '250px',
            }));
        }
    }, [windowSize]);

    return { swiperData };
};

export default usePrepareData;
