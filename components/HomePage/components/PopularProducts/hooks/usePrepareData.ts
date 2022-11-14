import { useEffect, useState } from 'react';
import useWindowSize from '../../../../../hooks/useWindowSize';

const usePrepareData = () => {
    const [swiperData, setSwiperData] = useState({
        slidesPerView: 6,
        imageHeight: '250px',
    });
    const windowSize = useWindowSize();

    useEffect(() => {
        const { width } = windowSize;
        if (width < 1400 && width >= 1200) {
            console.log(width);
        }
    }, [windowSize]);
};

export default usePrepareData;
