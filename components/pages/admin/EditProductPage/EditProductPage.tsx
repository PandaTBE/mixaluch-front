import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { productReducerValues } from '../../../../slices/Product/product';
import ProductInfoSection from '../AdminProductsPage/components/ProductInfoSection/ProductInfoSection';
import ProductImagesSection from '../AdminProductsPage/components/ProductImagesSection/ProductImagesSection';
import ProductExternalIdsSection from '../AdminProductsPage/components/ProductExternalIdsSection/ProductExternalIdsSection';

const EditProductPage = () => {
    const { selectedProduct } = useSelector(productReducerValues);

    if (!selectedProduct) {
        return null;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <ProductImagesSection product={selectedProduct} />
                <ProductExternalIdsSection product={selectedProduct} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <ProductInfoSection product={selectedProduct} />
            </Grid>
        </Grid>
    );
};

export default EditProductPage;
