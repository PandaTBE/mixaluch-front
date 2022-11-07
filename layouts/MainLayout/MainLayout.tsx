import { ContentWrapper, Wrapper } from './styles';

import Container from '../../components/Container/Container';
import { FC } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { IProps } from './interfaces';
import SubHeader from './components/SubHeader/SubHeader';
import useGetRawData from '../../hooks/useGetUserData';
import usePrepareData from '../../hooks/usePrepareData';

/**
 * Layot для оборачивания контена
 * @param children компонент, который необходимо обернуть
 */
const MainLayout: FC<IProps> = ({ children }) => {
    usePrepareData();
    useGetRawData();

    return (
        <Wrapper>
            <header>
                <Header />
                <SubHeader />
            </header>
            <ContentWrapper>
                <Container>{children}</Container>
            </ContentWrapper>
            <footer>
                <Footer />
            </footer>
        </Wrapper>
    );
};

/** HOC для отображения компонент с главным лэйаутом */
export const withMainLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        );
    };
};
