import type { AppProps } from 'next/app';
import DataComponent from '../components/DataComponent/DataComponent';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from '../constants/theme';
import { wrapper } from '../store';
import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { useEffect, useState } from 'react';
import Meta from '../components/Meta/Meta';

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <Provider store={store}>
            <Meta
                title={
                    'Интернет-магазин У Михалыча доставка продуктов по Подольску на дом или в офис, заказать продукты онлайн'
                }
            />
            <Head>
                <link rel="shortcut icon" href="/favico/favicon.ico" />
                <link rel="apple-touch-icon" sizes="60x60" href="/favico/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favico/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favico/favicon-16x16.png" />
                <link rel="manifest" href="/favico/site.webmanifest" />
                <link rel="mask-icon" href="/favico/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="viewport" content="width=device-width" />
                <meta charSet="utf-8" />
                <meta name="robots" content="all" />
                <meta name="yandex-verification" content="85e904ecac9751c9" />
            </Head>
            <DataComponent />
            <ThemeProvider theme={theme}>{hydrated && <Component {...props.pageProps} />}</ThemeProvider>
        </Provider>
    );
}

export default MyApp;
