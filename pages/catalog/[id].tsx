import { ProductApi } from '../../api/ProductApi';
import ProductInfoPage from '../../components/pages/ProductInfoPage/ProductInfoPage';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { storeSelectedProduct } from '../../slices/Product/product';
import { wrapper } from '../../store';
import { IProduct } from '../../models/Product';
import axios from 'axios';

/**
 * Страница информации о товаре
 */
const ProductInfo = ({ product }: { product: IProduct }) => {
    const description =
        product.description
            ?.replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim() || `Купить ${product.title} в интернет-магазине «У Михалыча» в Подольске.`;
    return (
        <MainLayout
            title={`${product.title} — купить в магазине «У Михалыча»`}
            description={description.slice(0, 160)}
            image={(product.product_image.find((item) => item.is_feature) || product.product_image[0])?.image}
        >
            <ProductInfoPage product={product} />
        </MainLayout>
    );
};

export default ProductInfo;

/**
 * Получение данных на сервере
 */
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const id = Number(context.params?.id);
    if (!Number.isSafeInteger(id) || id < 1) return { notFound: true };

    try {
        const product = await ProductApi.getProductInfo(id);
        store.dispatch(storeSelectedProduct(product));
        return { props: { product } };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) return { notFound: true };
        throw error;
    }
});
