import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
interface IProps {
    /** Заголовок страницы */
    title?: string;
    /** Описание страницы */
    description?: string;
}

/**
 * Компонент для передачи мета-тегов
 */
const Meta: FC<PropsWithChildren<IProps>> = ({
    title = 'Интернет-магазин У Михалыча доставка продуктов по Подольску',
    description = 'Интернет-магазин доставка продуктов по Подольску на дом или в офис, заказать продукты онлайн. Магазин «У Михалыча» предоставляет только качественные продукты по выгодным ценам.',
    children,
}) => {
    const router = useRouter();

    const site = 'https://mixaluch-shop.ru/';
    const canonicalURL = site + router.asPath;

    return (
        <>
            <Head>
                <title itemProp="headline">{title}</title>
                <meta itemProp="description" name="description" content={description} />
                <meta name="viewport" content="width=device-width" />
                <meta name="robots" content="all" />
                <meta charSet="utf-8" />
                <link rel="canonical" href={canonicalURL} />
                <meta property="og:locale" content="ru" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content={canonicalURL} />
                <meta property="og:image" content={'/favicon.ico'} />
                <meta property="og:site_name" content={'У Михалыча'} />
                <meta property="og:description" content={description} />
            </Head>
            {children}
        </>
    );
};

export default Meta;
