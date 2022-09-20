import { FC } from 'react';
import Container from '../../components/Container/Container';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { IProps } from './interfaces';
import { ContentWrapper, Wrapper } from './styles';

/**
 * Layot для оборачивания контена
 * @param children компонент, который необходимо обернуть
 */
const MainLayout: FC<IProps> = ({ children }) => {
    return (
        <Wrapper>
            <header>
                <Header />
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

/** HOC для отображения компонент с главный лэйаутом */
export const withMainLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <MainLayout>
                <Component {...props} />
            </MainLayout>
        );
    };
};
