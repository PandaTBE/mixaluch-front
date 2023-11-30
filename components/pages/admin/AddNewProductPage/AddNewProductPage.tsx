import { Grid } from '@mui/material';
import ProductInfoSection from '../AdminProductsPage/components/ProductInfoSection/ProductInfoSection';

/**
 * Добавление нового товара
 */
const AddNewProductPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProductInfoSection />
            </Grid>
        </Grid>
    );
};

export default AddNewProductPage;
