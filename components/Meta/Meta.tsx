import Head from 'next/head';
import { FC } from 'react';
interface IProps {
    /** Заголовок страницы */
    title: string;
    /** Описание страницы */
    description?: string;
}

/**
 * Компонент для передачи мета-тегов
 */
const Meta: FC<IProps> = ({ title, description = 'Магазин У Михалыча -  доставка продуктов по Подольску' }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    );
};

export default Meta;
