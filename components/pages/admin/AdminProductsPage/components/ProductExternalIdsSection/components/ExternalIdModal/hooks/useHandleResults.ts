import { useEffect } from 'react';
import { DS } from '../../../../../../../../../constants/constants';
import { productApi } from '../../../../../../../../../services/ProductService';
import {
    CREATE_EXTERNAL_ID_QUERY_KEY,
    DELETE_EXTERNAL_ID_QUERY_KEY,
    UPDATE_EXTERNAL_ID_QUERY_KEY,
} from '../../../constants/constants';
import { IProduct } from '../../../../../../../../../models/Product';
import { useDispatch } from 'react-redux';
import { storeProducts, storeSelectedProduct } from '../../../../../../../../../slices/Product/product';

const useHandleResults = (requestsId: string, product: IProduct) => {
    const createExternalIdResult = productApi.useCreateExternalIdMutation({
        fixedCacheKey: `${CREATE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    })[1];

    const deleteExternalIdResult = productApi.useDeleteExternalIdMutation({
        fixedCacheKey: `${DELETE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    })[1];

    const updateExternalIdResult = productApi.useUpdateExternalIdMutation({
        fixedCacheKey: `${UPDATE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    })[1];

    const allProductsResult = productApi.useGetProductsQuery(
        {},
        {
            skip:
                !createExternalIdResult.isSuccess &&
                !deleteExternalIdResult.isSuccess &&
                !updateExternalIdResult.isSuccess,
        },
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (createExternalIdResult.isSuccess) {
            allProductsResult.refetch();
        }
    }, [createExternalIdResult.isSuccess]);

    useEffect(() => {
        if (deleteExternalIdResult.isSuccess) {
            allProductsResult.refetch();
        }
    }, [deleteExternalIdResult.isSuccess]);

    useEffect(() => {
        if (updateExternalIdResult.isSuccess) {
            allProductsResult.refetch();
        }
    }, [updateExternalIdResult.isSuccess]);

    useEffect(() => {
        if (allProductsResult.data) {
            const currentProduct = allProductsResult.data.find((item) => item.id === product.id);
            dispatch(storeProducts(allProductsResult.data));
            if (currentProduct) {
                dispatch(storeSelectedProduct(currentProduct));
            }
        }
    }, [allProductsResult.data]);
};

export default useHandleResults;
