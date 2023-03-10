import Head from 'next/head';
import { useRouter } from 'next/router';
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
    const router = useRouter();

    const site = 'https://mixaluch-shop-dev.ru/';
    const canonicalURL = site + router.asPath;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="yandex-verification" content="2c5486f281db7b72" />
            <meta name="viewport" content="width=device-width" />
            <meta name="robots" content="all" />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favico/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favico/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favico/favicon-16x16.png" />
            <link rel="mask-icon" href="/favico/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="manifest" href="/favico/site.webmanifest" />
            <link rel="canonical" href={canonicalURL} />
        </Head>
    );
};

export default Meta;
