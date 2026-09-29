import { Alert, Button, CircularProgress, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productReducerValues, storeSelectedProduct } from '../../../../slices/Product/product';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { productApi } from '../../../../services/ProductService';
import useAdminCategories from '../../../../hooks/useAdminCategories';
import { AdminProductsApi } from '../../../../api/admin/products/AdminProductsApi';
import { userReducerValues } from '../../../../slices/User/user';
import { storeProductsByStoreId, storeStores } from '../../../../slices/Evotor/evotor';
import ProductInfoSection from '../AdminProductsPage/components/ProductInfoSection/ProductInfoSection';
import ProductImagesSection from '../AdminProductsPage/components/ProductImagesSection/ProductImagesSection';
import ProductExternalIdsSection from '../AdminProductsPage/components/ProductExternalIdsSection/ProductExternalIdsSection';

const EditProductPage = () => {
    const router = useRouter();
    const id = Number(router.query.id);
    const validId = Number.isSafeInteger(id) && id > 0;
    const dispatch = useDispatch();
    const { authToken } = useSelector(userReducerValues);
    const categories = useAdminCategories();
    const { currentData, isError, refetch } = productApi.useGetProductByIdQuery(id, {
        skip: !validId,
        refetchOnMountOrArgChange: true,
    });
    const { selectedProduct } = useSelector(productReducerValues);
    const [evotorError, setEvotorError] = useState(false);
    const [evotorAttempt, setEvotorAttempt] = useState(0);

    useEffect(() => {
        if (currentData) dispatch(storeSelectedProduct(currentData));
    }, [currentData, dispatch]);

    useEffect(() => {
        if (!authToken) return;
        let active = true;
        setEvotorError(false);
        dispatch(storeStores([]));
        dispatch(storeProductsByStoreId(null));
        AdminProductsApi.getEvotorData(authToken)
            .then((data) => {
                if (!active) return;
                dispatch(storeStores(data.stores));
                dispatch(storeProductsByStoreId(data.productsByStoreId));
            })
            .catch(() => { if (active) setEvotorError(true); });
        return () => { active = false; };
    }, [authToken, dispatch, evotorAttempt]);

    if (router.isReady && !validId) return <Alert severity="error">Неверный ID товара.</Alert>;
    if ((isError && (!selectedProduct || selectedProduct.id !== id)) || categories.error) {
        return <Alert severity="error" action={<Button onClick={() => { refetch(); categories.retry(); }}>Повторить</Button>}>
            Не удалось загрузить товар или категории.
        </Alert>;
    }
    if (categories.loading || !selectedProduct || selectedProduct.id !== id) {
        return <CircularProgress aria-label="Загрузка товара" />;
    }

    return (
        <Grid container spacing={2}>
            {isError && <Grid item xs={12}><Alert severity="warning" action={
                <Button onClick={() => refetch()}>Повторить</Button>
            }>Не удалось обновить данные товара. Введённые изменения сохранены в форме.</Alert></Grid>}
            {evotorError && <Grid item xs={12}><Alert severity="warning" action={
                <Button onClick={() => setEvotorAttempt((value) => value + 1)}>Повторить</Button>
            }>Эвотор недоступен. Данные товара можно редактировать.</Alert></Grid>}
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
