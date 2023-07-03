import { INews } from '../../../../../../models/News';

export interface IProps {
    /**
     * Функция для удаления одной новости
     */
    removeImportantNews: (id: number) => void;
    /**
     * Данные новости
     */
    newsData: INews;
}
