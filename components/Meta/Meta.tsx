import Head from 'next/head';
import { FC } from 'react';
interface IProps {
    /** Заголовок страницы */
    title?: string;
    /** Описание страницы */
    description?: string;
}

/**
 * Компонент для передачи мета-тегов
 */
const Meta: FC<IProps> = ({
    title = 'Интернет-магазин У Михалыча доставка продуктов по Подольску',
    description = 'Интернет-магазин доставка продуктов по Подольску на дом или в офис, заказать продукты онлайн. Магазин «У Михалыча» предоставляет только качественные продукты по выгодным ценам.',
}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    );
};

export default Meta;
