import { useEffect } from 'react';
import { productApi } from '../../../../../../../services/ProductService';
import { CREATE_PRODUCT_QUERY_QEY, DELETE_PRODUCT_QUERY_QEY, UPDATE_PRODUCT_QUERY_QEY } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { storeSelectedProduct } from '../../../../../../../slices/Product/product';
import { useRouter } from 'next/router';
import { DS } from '../../../../../../../constants/constants';

const useHandleResults = (requestsId: string) => {
    const updateProductResult = productApi.useUpdateProductMutation({
        fixedCacheKey: `${UPDATE_PRODUCT_QUERY_QEY}${DS}${requestsId}`,
    })[1];

    const deleteProductResult = productApi.useDeleteProductMutation({
        fixedCacheKey: `${DELETE_PRODUCT_QUERY_QEY}${DS}${requestsId}`,
    })[1];

    const createProductResult = productApi.useCreateProductMutation({
        fixedCacheKey: `${CREATE_PRODUCT_QUERY_QEY}${DS}${requestsId}`,
    })[1];

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (createProductResult.data) {
            dispatch(storeSelectedProduct(createProductResult.data));
            router.push(`/admin/products/${createProductResult.data.id}`);
        }
    }, [createProductResult.data]);

    useEffect(() => {
        if (deleteProductResult.isSuccess) {
            router.push('/admin/products');
        }
    }, [deleteProductResult.isSuccess]);

    useEffect(() => {
        if (updateProductResult.data) {
            dispatch(storeSelectedProduct(updateProductResult.data));
        }
    }, [updateProductResult?.data]);


};

export default useHandleResults;
