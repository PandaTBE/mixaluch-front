import type { AppProps } from 'next/app';
import DataComponent from '../components/DataComponent/DataComponent';
import { ruRU } from '@mui/x-date-pickers/locales';
import { createTheme, ThemeProvider as MaterialUiThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { theme } from '../constants/theme';
import { wrapper } from '../store';
import { GlobalStyles } from '../styles/styles';
import 'react-loading-skeleton/dist/skeleton.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import '../i18n';
import Meta from '../components/Meta/Meta';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';
import { CatalogSearchProvider } from '../components/CatalogSearchProvider';

const materialUiTheme = createTheme({ palette: { primary: { main: theme.colors.primary } } }, ruRU);

function MyApp({ Component, ...rest }: AppProps) {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <MaterialUiThemeProvider theme={materialUiTheme}>
                <Meta>
                    <DataComponent />
                    <NuqsAdapter>
                        <CatalogSearchProvider>
                            <ThemeProvider theme={theme}>
                                <GlobalStyles />
                                <Component {...props.pageProps} />
                            </ThemeProvider>
                        </CatalogSearchProvider>
                    </NuqsAdapter>
                </Meta>
            </MaterialUiThemeProvider>
        </Provider>
    );
}

export default MyApp;
