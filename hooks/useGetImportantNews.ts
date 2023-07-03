import { useDispatch } from 'react-redux';
import { newsApi } from '../services/NewsService';
import { useEffect } from 'react';
import { storeImportantNews } from '../slices/News/news';

/**
 * Кастомный хук для получения важных новостей
 */
const useGetImportantNews = () => {
    const { data } = newsApi.useGetImportantNewsQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(storeImportantNews(data));
        }
    }, [data]);
};

export default useGetImportantNews;
