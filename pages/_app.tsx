import type { AppProps } from 'next/app';
import DataComponent from '../components/DataComponent/DataComponent';
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
import '../i18n';

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        <Provider store={store}>
            <DataComponent />
            <ThemeProvider theme={theme}>{hydrated && <Component {...props.pageProps} />}</ThemeProvider>
        </Provider>
    );
}

export default MyApp;
