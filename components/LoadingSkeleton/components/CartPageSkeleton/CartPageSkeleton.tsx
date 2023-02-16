import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../../../PageTitle/PageTitle';
import { ContentWrapper, Wrapper } from './styles';

const CartPageSkeleton = () => {
    return (
        <Wrapper>
            <PageTitle text={'Корзина'} />
            <ContentWrapper>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} xl={9}>
                        <Stack direction="column" spacing={2}>
                            {Array(3)
                                .fill(null)
                                .map((_, index) => (
                                    <Skeleton key={index} height={200} />
                                ))}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4} xl={3}>
                        <Skeleton height={125} />
                    </Grid>
                </Grid>
            </ContentWrapper>
        </Wrapper>
    );
};

export default CartPageSkeleton;
