import { ProductApi } from '../../api/ProductApi';
import ProductInfoPage from '../../components/pages/ProductInfoPage/ProductInfoPage';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { storeSelectedProduct } from '../../slices/Product/product';
import { wrapper } from '../../store';

/**
 * Страница информации о товаре
 */
const ProductInfo = () => {
    return (
        <MainLayout title={'Информация о товаре'}>
            <ProductInfoPage />
        </MainLayout>
    );
};

export default ProductInfo;

/**
 * Получение данных на сервере
 */
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    if (context?.params?.id) {
        try {
            const productInfo = await ProductApi.getProductInfo(Number(context.params.id));
            store.dispatch(storeSelectedProduct(productInfo));
        } catch (error) {
            console.log(error);
            return {
                props: {},
            };
        }
    }

    return {
        props: {},
    };
});
