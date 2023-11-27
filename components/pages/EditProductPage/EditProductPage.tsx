import Link from 'next/link';
import { ADMIN_TABS } from '../../../constants/admin';
import { LinkText, Wrapper } from './styles';
import { Grid, Stack } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { theme } from '../../../constants/theme';
import { useSelector } from 'react-redux';
import { productReducerValues } from '../../../slices/Product/product';
import ProductInfoSection from '../AdminProductsPage/components/ProductInfoSection/ProductInfoSection';
import ProductImagesSection from '../AdminProductsPage/components/ProductImagesSection/ProductImagesSection';

const EditProductPage = () => {
    const { selectedProduct } = useSelector(productReducerValues);

    return (
        <Wrapper>
            <Stack flexWrap="wrap" direction="row" alignItems="center" display="inline-flex" gap={2}>
                <Link href={ADMIN_TABS[0].href}>
                    <Stack direction="row" alignItems="center" display="inline-flex" gap={1}>
                        <ArrowBackIosNewRoundedIcon fontSize={'small'} htmlColor={theme.colors.primary} />
                        <LinkText>Назад к товарам</LinkText>
                    </Stack>
                </Link>
            </Stack>
            {selectedProduct ? (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <ProductImagesSection product={selectedProduct} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ProductInfoSection product={selectedProduct} />
                        </Grid>
                    </Grid>
                </>
            ) : null}
        </Wrapper>
    );
};

export default EditProductPage;
