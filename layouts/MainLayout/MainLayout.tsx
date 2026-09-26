import { BackToTopButton, ContentWrapper, LoadingStatus, Wrapper } from './styles';

import Container from '../../components/Container/Container';
import { FC, useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { IProps } from './interfaces';
import SubHeader from './components/SubHeader/SubHeader';
import usePageLoading from '../../hooks/usePageLoading';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSekeleton';
import Meta from '../../components/Meta/Meta';
import ImportantNews from './components/ImportantNews/ImportantNews';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

/**
 * Макет для оборачивания контента
 * @param children компонент, который необходимо обернуть
 */
const MainLayout: FC<IProps> = ({ children, title, description, image }) => {
    const { loading, targetUrl } = usePageLoading();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const updateVisibility = () => setShowBackToTop(window.scrollY > 320);

        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });
        return () => window.removeEventListener('scroll', updateVisibility);
    }, []);

    const scrollToTop = () => {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({ top: 0, behavior });
    };

    return (
        <Meta title={title} description={description} image={image}>
            <Wrapper>
                <a className="skip-link" href="#main-content">
                    Перейти к содержимому
                </a>
                <ImportantNews />
                <header>
                    <SubHeader />
                    <Header />
                </header>
                {loading && <LoadingStatus role="status">Загрузка страницы…</LoadingStatus>}
                <ContentWrapper id="main-content" aria-busy={loading}>
                    <Container>
                        {targetUrl ? <LoadingSkeleton url={targetUrl} fallback={children} /> : children}
                    </Container>
                </ContentWrapper>
                <footer>
                    <Footer />
                </footer>
                {showBackToTop && (
                    <BackToTopButton type="button" aria-label="Наверх" onClick={scrollToTop}>
                        <ArrowUpwardRoundedIcon />
                    </BackToTopButton>
                )}
            </Wrapper>
        </Meta>
    );
};

export default MainLayout;
