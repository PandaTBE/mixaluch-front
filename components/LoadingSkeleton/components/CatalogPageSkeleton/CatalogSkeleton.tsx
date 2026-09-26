import { CategoryHeading, CategoryContent, HeadingContent, HeadingSkeleton } from './styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridViewIcon from '@mui/icons-material/GridView';
import Skeleton from 'react-loading-skeleton';
import {
    Aside,
    CatalogGrid,
    CategoryTrigger,
    ContentWrapper,
    Heading,
    TreeList,
    Wrapper,
} from '../../../pages/CatalogPage/styles';
import { Row, Wrapper as Category } from '../../../pages/CatalogPage/components/CategoryItem/styles';
import ProductCardSkeleton from '../ProductCardSkeleton';

/**
 * Повторяем сетку каталога и адаптивность свёрнутого меню категорий.
 */
const CatalogSkeleton = () => {
    return (
        <Wrapper aria-hidden="true">
            <ContentWrapper>
                <Aside $open={false}>
                    <h2>
                        <Skeleton width="65%" />
                    </h2>
                    <CategoryTrigger as="div">
                        <GridViewIcon />
                        <span>
                            <span>
                                <Skeleton width={70} />
                            </span>
                            <strong>
                                <Skeleton width="60%" />
                            </strong>
                        </span>
                        <ExpandMoreIcon />
                    </CategoryTrigger>
                    <nav>
                        <CategoryHeading>
                            <Skeleton width="70%" />
                        </CategoryHeading>
                        <TreeList>
                            {Array.from({ length: 7 }, (_, index) => (
                                <Category key={index}>
                                    <Row>
                                        <CategoryContent>
                                            <Skeleton width="80%" />
                                        </CategoryContent>
                                    </Row>
                                </Category>
                            ))}
                        </TreeList>
                    </nav>
                </Aside>
                <div>
                    <Heading>
                        <HeadingContent>
                            <h1>
                                <HeadingSkeleton width="70%" />
                            </h1>
                            <p>
                                <Skeleton width={95} />
                            </p>
                        </HeadingContent>
                    </Heading>
                    <CatalogGrid>
                        {Array.from({ length: 12 }, (_, index) => (
                            <ProductCardSkeleton key={index} imageHeight="220px" />
                        ))}
                    </CatalogGrid>
                </div>
            </ContentWrapper>
        </Wrapper>
    );
};

export default CatalogSkeleton;
