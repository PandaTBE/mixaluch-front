import { useDispatch } from 'react-redux';
import { storeSelectedProduct } from '../../../../../../../../../slices/Product/product';
import { productApi } from '../../../../../../../../../services/ProductService';

const useHandleResults = (productId: number) => {
    const dispatch = useDispatch();
    const [getProduct] = productApi.useLazyGetProductByIdQuery();

    return async () => {
        const product = await getProduct(productId, false).unwrap();
        dispatch(storeSelectedProduct(product));
    };
};

export default useHandleResults;
