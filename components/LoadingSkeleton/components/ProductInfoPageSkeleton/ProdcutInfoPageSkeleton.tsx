import { Grid, Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { Wrapper } from './styles';

/**
 * Компонент для отображения страницы загрузки для выбранного товара
 */
const ProductInfoPageSkeleton = () => {
    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Skeleton height={300} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                        <Skeleton height={25} width={'50%'} />
                        <Skeleton height={50} />
                        <Skeleton height={100} />
                    </Stack>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default ProductInfoPageSkeleton;
