import { ProductApi } from '../../api/ProductApi';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { storeSelectedProduct } from '../../slices/Product/product';
import { wrapper } from '../../store';

/**
 * Страница информации о товаре
 */
const ProductInfo = () => {
    return null;
};

export default withMainLayout(ProductInfo);

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
