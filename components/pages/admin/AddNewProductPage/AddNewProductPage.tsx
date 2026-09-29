import { Alert, Button, CircularProgress, Grid } from '@mui/material';
import useAdminCategories from '../../../../hooks/useAdminCategories';
import ProductInfoSection from '../AdminProductsPage/components/ProductInfoSection/ProductInfoSection';

/**
 * Добавление нового товара
 */
const AddNewProductPage = () => {
    const { loading, error, retry } = useAdminCategories();
    if (loading) return <CircularProgress aria-label="Загрузка категорий" />;
    if (error) return <Alert severity="error" action={<Button onClick={retry}>Повторить</Button>}>
        Не удалось загрузить категории.
    </Alert>;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProductInfoSection />
            </Grid>
        </Grid>
    );
};

export default AddNewProductPage;
