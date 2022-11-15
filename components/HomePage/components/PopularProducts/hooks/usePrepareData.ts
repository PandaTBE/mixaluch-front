import { useEffect, useState } from 'react';
import useWindowSize from '../../../../../hooks/useWindowSize';

const usePrepareData = () => {
    const [swiperData, setSwiperData] = useState({
        slidesPerView: 5,
        imageHeight: '230px',
        spaceBetween: 10,
    });
    const windowSize = useWindowSize();

    useEffect(() => {
        const { width } = windowSize;
        if (width < 1400 && width >= 1200) {
            setSwiperData((prevState) => ({
                ...prevState,
                slidesPerView: 5,
                imageHeight: '220px',
            }));
        }

        if (width < 1200 && width >= 991) {
            setSwiperData((prevState) => ({
                ...prevState,

                slidesPerView: 4,
                imageHeight: '220px',
            }));
        }

        if (width < 991 && width >= 787) {
            setSwiperData((prevState) => ({
                ...prevState,
                slidesPerView: 3,
                imageHeight: '220px',
            }));
        }
        if (width < 787 && width >= 675) {
            setSwiperData((prevState) => ({
                ...prevState,
                slidesPerView: 4,
                imageHeight: '150px',
            }));
        }
        if (width < 675 && width >= 510) {
            setSwiperData((prevState) => ({
                ...prevState,
                slidesPerView: 3,
                imageHeight: '150px',
            }));
        }

        if (width < 510 && width >= 345) {
            setSwiperData((prevState) => ({
                ...prevState,
                slidesPerView: 2,
                imageHeight: '180px',
            }));
        }

        if (width < 345) {
            setSwiperData((prevState) => ({
                ...prevState,
                slidesPerView: 1,
                imageHeight: '300px',
            }));
        }
    }, [windowSize]);

    return { swiperData };
};

export default usePrepareData;
