import { ProductApi } from '../../api/ProductApi';
import ProductInfoPage from '../../components/pages/ProductInfoPage/ProductInfoPage';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { storeSelectedProduct } from '../../slices/Product/product';
import { wrapper } from '../../store';

/**
 * Страница информации о товаре
 */
const ProductInfo = () => {
    return <ProductInfoPage />;
};

export default withMainLayout(ProductInfo, 'Информация о товаре');

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
