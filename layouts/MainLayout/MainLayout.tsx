import { ContentWrapper, Wrapper } from './styles';

import Container from '../../components/Container/Container';
import { FC, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { IProps } from './interfaces';
import SubHeader from './components/SubHeader/SubHeader';
import usePageLoading from '../../hooks/usePageLoading';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSekeleton';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { storePageToSwitch } from '../../slices/General/general';
import { TPageToSwitch } from '../../slices/General/interfaces';
import Meta from '../../components/Meta/Meta';

/**
 * Layot для оборачивания контена
 * @param children компонент, который необходимо обернуть
 */
const MainLayout: FC<IProps> = ({ children, title = 'У Михалыча', description }) => {
    const { loading } = usePageLoading();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(storePageToSwitch(router.pathname as TPageToSwitch));
    }, []);

    return (
        <Wrapper>
            <Meta title={title} description={description} />
            <header>
                <Header />
                <SubHeader />
            </header>
            <ContentWrapper>
                {loading ? (
                    <Container>
                        <LoadingSkeleton />
                    </Container>
                ) : (
                    <Container>{children}</Container>
                )}
            </ContentWrapper>
            <footer>
                <Footer />
            </footer>
        </Wrapper>
    );
};

/** HOC для отображения компонент с главным лэйаутом */
export const withMainLayout = <T extends Record<string, unknown>>(
    Component: FC<T>,
    title?: string,
    description?: string,
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <MainLayout title={title} description={description}>
                <Component {...props} />
            </MainLayout>
        );
    };
};
