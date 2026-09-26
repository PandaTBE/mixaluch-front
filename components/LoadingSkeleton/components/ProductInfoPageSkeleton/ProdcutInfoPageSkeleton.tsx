import {
    ImageGallery,
    ThumbnailList,
    ProductActions,
    BackLinkPlaceholder,
    ThumbnailPlaceholder,
    MainImagePlaceholder,
} from './styles';
import { Grid, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import {
    BoxWrapper,
    ButtonWrapper,
    Price,
    ProductTitle,
    SideSwiper,
    Wrapper,
} from '../../../pages/ProductInfoPage/styles';

/**
 * Компонент для отображения страницы загрузки для выбранного товара
 */
const ProductInfoPageSkeleton = () => {
    return (
        <Wrapper aria-hidden="true">
            <BackLinkPlaceholder>
                <Skeleton width={185} />
            </BackLinkPlaceholder>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <ImageGallery direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <SideSwiper as="div" className="swiper">
                            <ThumbnailList direction={{ xs: 'row', sm: 'column' }}>
                                {Array.from({ length: 3 }, (_, index) => (
                                    <ThumbnailPlaceholder key={index}>
                                        <Skeleton height="100%" borderRadius={16} />
                                    </ThumbnailPlaceholder>
                                ))}
                            </ThumbnailList>
                        </SideSwiper>
                        <MainImagePlaceholder as="div" className="swiper">
                            <Skeleton height="100%" borderRadius={16} />
                        </MainImagePlaceholder>
                    </ImageGallery>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ProductTitle>
                        <Skeleton width="85%" />
                    </ProductTitle>
                    <BoxWrapper>
                        <ProductActions direction="row">
                            <Stack direction="column" spacing={1}>
                                <Price>
                                    <Skeleton width={110} />
                                </Price>
                                <div>
                                    <Skeleton width={55} />
                                </div>
                            </Stack>
                            <ButtonWrapper>
                                <Skeleton height={40} containerClassName="skeleton-block" />
                            </ButtonWrapper>
                        </ProductActions>
                    </BoxWrapper>
                    <BoxWrapper>
                        <Skeleton count={3} />
                    </BoxWrapper>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default ProductInfoPageSkeleton;
