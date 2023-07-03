import { useSelector } from 'react-redux';
import { newsReducerValues } from '../../../../slices/News/news';
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Wrapper } from './styles';
import SingleImportantNews from './components/SingleImportantNews/SingleImportantNews';
import { INews } from '../../../../models/News';

/**
 * Компонент для отображения важных новостей
 */
const ImportantNews = () => {
    const { importantNews } = useSelector(newsReducerValues);

    const [importantNewsToShow, setImportantNewsToShow] = useState<INews[]>([]);

    useEffect(() => {
        setImportantNewsToShow(cloneDeep(importantNews));
    }, [importantNews]);

    const removeImportantNews = (id: number) => {
        setImportantNewsToShow((prevState) => {
            return prevState.filter((news) => news.id !== id);
        });
    };

    return (
        <Wrapper>
            {importantNewsToShow.map((element) => (
                <SingleImportantNews key={element.id} removeImportantNews={removeImportantNews} newsData={element} />
            ))}
        </Wrapper>
    );
};

export default ImportantNews;
