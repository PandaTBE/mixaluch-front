import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeProducts, storeSelectedProduct } from '../../../../../../../../../slices/Product/product';
import { productApi } from '../../../../../../../../../services/ProductService';
import {
    CREATE_PRODUCT_IMAGE_QUERY_KEY,
    DELETE_PRODUCT_IMAGE_QUERY_KEY,
    UPDATE_PRODUCT_IMAGE_QUERY_KEY,
} from '../../../constants/constants';
import { DS } from '../../../../../../../../../constants/constants';

const useHandleResults = (requestsId: string, productId: number) => {
    const createProductImageResult = productApi.useCreateProductImageMutation({
        fixedCacheKey: `${CREATE_PRODUCT_IMAGE_QUERY_KEY}${DS}${requestsId}`,
    })[1];
    const updateProductImageResult = productApi.useUpdateProductImageMutation({
        fixedCacheKey: `${UPDATE_PRODUCT_IMAGE_QUERY_KEY}${DS}${requestsId}`,
    })[1];
    const deleteProductImageResult = productApi.useDeleteProductImageMutation({
        fixedCacheKey: `${DELETE_PRODUCT_IMAGE_QUERY_KEY}${DS}${requestsId}`,
    })[1];

    const allProductsResult = productApi.useGetProductsQuery(
        {},
        {
            skip:
                !createProductImageResult.isSuccess &&
                !updateProductImageResult.isSuccess &&
                !deleteProductImageResult.isSuccess,
        },
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (createProductImageResult.isSuccess) {
            allProductsResult.refetch();
        }
    }, [createProductImageResult.isSuccess]);

    useEffect(() => {
        if (updateProductImageResult.isSuccess) {
            allProductsResult.refetch();
        }
    }, [updateProductImageResult.isSuccess]);

    useEffect(() => {
        if (deleteProductImageResult.isSuccess) {
            allProductsResult.refetch();
        }
    }, [deleteProductImageResult.isSuccess]);

    useEffect(() => {
        if (allProductsResult.data) {
            const currentProduct = allProductsResult.data.find((item) => item.id === productId);
            dispatch(storeProducts(allProductsResult.data));
            if (currentProduct) {
                dispatch(storeSelectedProduct(currentProduct));
            }
        }
    }, [allProductsResult.data]);
};

export default useHandleResults;
