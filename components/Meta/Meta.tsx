import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
interface IProps {
    /** Заголовок страницы */
    title?: string;
    /** Описание страницы */
    description?: string;
    image?: string;
}

/**
 * Компонент для передачи мета-тегов
 */
const Meta: FC<PropsWithChildren<IProps>> = ({
    title = 'Интернет-магазин У Михалыча доставка продуктов по Подольску',
    description = 'Интернет-магазин доставка продуктов по Подольску на дом или в офис, заказать продукты онлайн. Магазин «У Михалыча» предоставляет только качественные продукты по выгодным ценам.',
    children,
    image,
}) => {
    const router = useRouter();

    const site = (process.env.NEXT_PUBLIC_FRONT_HOST || 'https://mixaluch-shop.ru').replace(/\/+$/, '');
    const currentURL = new URL(router.asPath, `${site}/`);
    const canonical = new URL(currentURL.pathname, `${site}/`);
    const isCatalog = currentURL.pathname === '/catalog';
    const category = currentURL.searchParams.get('category');
    const page = currentURL.searchParams.get('page');

    if (isCatalog) {
        if (category && /^[1-9]\d*$/.test(category) && Number.isSafeInteger(Number(category))) {
            canonical.searchParams.set('category', String(Number(category)));
        }
        if (page && /^[1-9]\d*$/.test(page) && Number.isSafeInteger(Number(page)) && Number(page) > 1) {
            canonical.searchParams.set('page', String(Number(page)));
        }
    }

    const canonicalURL = canonical.toString();
    const privatePage =
        /^\/(admin|cart|ordering|orders|user-account|login|register|activate|reset-password|reset-password-confirm)(\/|$)/.test(
            currentURL.pathname,
        );
    const noIndex =
        process.env.NEXT_PUBLIC_ENV === 'dev' ||
        privatePage ||
        ['/404', '/500'].includes(currentURL.pathname) ||
        (isCatalog && currentURL.searchParams.has('search'));

    return (
        <>
            <Head>
                <title itemProp="headline">{title}</title>
                <meta itemProp="description" name="description" content={description} key="description" />
                <meta name="viewport" content="width=device-width" />
                <meta name="robots" content={noIndex ? 'noindex,follow' : 'index,follow'} key="robots" />
                <meta charSet="utf-8" />
                {!privatePage && <link rel="canonical" href={canonicalURL} key="canonical" />}
                <meta property="og:locale" content="ru" />
                <meta property="og:title" content={title} key="og:title" />
                {!privatePage && <meta property="og:url" content={canonicalURL} key="og:url" />}
                <meta
                    property="og:image"
                    content={image ? new URL(image, `${site}/`).toString() : `${site}/favicon.ico`}
                    key="og:image"
                />
                <meta property="og:site_name" content={'У Михалыча'} />
                <meta property="og:description" content={description} key="og:description" />
            </Head>
            {children}
        </>
    );
};

export default Meta;
