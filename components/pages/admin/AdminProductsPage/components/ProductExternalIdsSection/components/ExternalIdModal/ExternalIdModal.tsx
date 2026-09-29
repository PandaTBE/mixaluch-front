import { FC, SyntheticEvent, useEffect, useId, useMemo, useState } from 'react';
import { IProps, TExtendedEvotorProduct } from './interfaces';
import { Button, Modal, Stack } from '@mui/material';
import { DEFAULT_MODAL_STYLES } from '../../../../../../../../constants/modal';
import PageTitle from '../../../../../../../PageTitle/PageTitle';
import { ContentWrapper, EvotorDataWrapper, Wrapper } from './styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { evotorReducerValues } from '../../../../../../../../slices/Evotor/evotor';
import { IEvotorProduct } from '../../../../../../../../models/Evotor';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../../../../constants/admin';
import EvotorProductData from '../../../EvotorProductData/EvotorProductData';
import ErrorMessage from '../../../../../../../ErrorMessage/ErrorMessage';
import { IExternalIdDTO } from '../../../../../../../../models/Product';
import { productApi } from '../../../../../../../../services/ProductService';
import {
    CREATE_EXTERNAL_ID_QUERY_KEY,
    DELETE_EXTERNAL_ID_QUERY_KEY,
    UPDATE_EXTERNAL_ID_QUERY_KEY,
} from '../../constants/constants';
import { DS } from '../../../../../../../../constants/constants';
import useHandleResults from './hooks/useHandleResults';
import DeleteConfirmModal from '../../../DeleteConfirmModal/DeleteConfirmModal';

const ExternalIdModal: FC<IProps> = ({ isOpen, toggleOpen, product, externalId }) => {
    const requestsId = useId();

    const { productsByStoreId, storesById, productsByStoreIdByProductId } = useSelector(evotorReducerValues);

    const [createExternalId, createExternalIdResult] = productApi.useCreateExternalIdMutation({
        fixedCacheKey: `${CREATE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    });

    const [deleteExternalId, deleteExternalIdResult] = productApi.useDeleteExternalIdMutation({
        fixedCacheKey: `${DELETE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    });

    const [updateExternalId, updateExternalIdResult] = productApi.useUpdateExternalIdMutation({
        fixedCacheKey: `${UPDATE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    });

    const [selectedEvotorProduct, setSelectedEvotorProduct] = useState<TExtendedEvotorProduct | null>(null);
    const [error, setError] = useState('');
    const [hasSavedMutation, setHasSavedMutation] = useState(false);
    const [isRefreshing, setRefreshing] = useState(false);
    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const [isCanceled, setIsCanceled] = useState({});

    const refreshProduct = useHandleResults(product.id);

    useEffect(() => {
        setHasSavedMutation(false);
        setSelectedEvotorProduct(null);
        setError('');
        if (externalId && productsByStoreIdByProductId && externalId.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE) {
            const splittedId = externalId.external_id.split('/');
            const evotorProduct = productsByStoreIdByProductId[splittedId?.[0]]?.[splittedId?.[1]] as
                | undefined
                | IEvotorProduct;

            if (evotorProduct) {
                setSelectedEvotorProduct({ ...evotorProduct, storeId: splittedId[0] });
            }
        }
    }, [externalId, productsByStoreIdByProductId, isOpen, isCanceled]);

    const evotorProductOptions = useMemo(() => {
        if (productsByStoreId) {
            return Object.entries(productsByStoreId || {}).reduce(
                (acc: TExtendedEvotorProduct[], [storeId, products]) => {
                    const extendedProducts = products.map((product) => ({ ...product, storeId }));
                    acc.push(...extendedProducts);
                    return acc;
                },
                [],
            );
        }
        return [];
    }, [productsByStoreId]);

    const onCancel = () => {
        setIsCanceled({});
    };

    const finishMutation = async () => {
        setRefreshing(true);
        try {
            await refreshProduct();
            toggleOpen();
        } catch {
            setError('Изменение сохранено, но не удалось обновить товар. Перезагрузите страницу.');
        } finally {
            setRefreshing(false);
        }
    };

    const onSave = async () => {
        if (hasSavedMutation) return finishMutation();
        if (!selectedEvotorProduct || isLoading) return;
        setError('');
        setRefreshing(true);
        const data: IExternalIdDTO = {
            data_source: EVOTOR_EXTERNAL_ID_DATA_SOURCE,
            external_id: `${selectedEvotorProduct.storeId}/${selectedEvotorProduct.uuid}`,
            product: product.id,
        };
        try {
            if (externalId) {
                await updateExternalId({ id: externalId.id, data }).unwrap();
            } else {
                await createExternalId(data).unwrap();
            }
        } catch (error) {
            const isValidationError = error && typeof error === 'object' && 'status' in error && error.status === 400;
            setError(isValidationError
                ? 'Не удалось сохранить связь. Возможно, этот товар Эвотор уже связан с другим товаром.'
                : 'Не удалось сохранить связь с Эвотор. Повторите попытку.');
            setRefreshing(false);
            return;
        }
        setHasSavedMutation(true);
        await finishMutation();
    };

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const onDeleteConfirm = async () => {
        if (!externalId || isLoading) return;
        if (hasSavedMutation) return finishMutation();
        setError('');
        setRefreshing(true);
        try {
            await deleteExternalId(externalId.id).unwrap();
        } catch {
            setError('Не удалось удалить связь с Эвотор. Повторите попытку.');
            setRefreshing(false);
            return;
        }
        setHasSavedMutation(true);
        await finishMutation();
    };

    const isLoading =
        createExternalIdResult.isLoading || deleteExternalIdResult.isLoading || updateExternalIdResult.isLoading || isRefreshing;

    return (
        <Modal open={isOpen} onClose={() => !isLoading && toggleOpen()}>
            <Wrapper style={DEFAULT_MODAL_STYLES}>
                <Modal onClose={toggleDeleteConfirmModal} open={isDeleConfirmModalOpen}>
                    <DeleteConfirmModal
                        bodyText={'Вы уверены, что хотите удалить связь с Эвотор?'}
                        titleText={'Удаление связи с Эвотор'}
                        deleteConfirm={onDeleteConfirm}
                        toggleOpen={toggleDeleteConfirmModal}
                    />
                </Modal>
                <PageTitle text={externalId ? 'Редактировать связь с Эвотор' : 'Создать связь с Эвотор'} />
                <ContentWrapper>
                    <Stack direction="column" gap={1} marginBottom={2}>
                        {error && <ErrorMessage text={error} />}
                        {externalId && !selectedEvotorProduct && (
                            <span>Текущая связь: {externalId.external_id}. Данные товара Эвотор недоступны; связь можно удалить или заменить.</span>
                        )}
                    </Stack>
                    <Autocomplete
                        disabled={isLoading}
                        renderOption={(props, option: TExtendedEvotorProduct) => {
                            return (
                                <li {...props} key={`${option.storeId}_${option.uuid}`}>
                                    {option.name}
                                </li>
                            );
                        }}
                        onChange={(_: SyntheticEvent<Element, Event>, newValue) => {
                            setError('');
                            setSelectedEvotorProduct(newValue);
                        }}
                        groupBy={(option: TExtendedEvotorProduct) =>
                            storesById?.[option.storeId]?.name || option.storeId
                        }
                        renderInput={(params) => <TextField {...params} label="Товар из Эвотор" />}
                        getOptionLabel={(option: IEvotorProduct) => option.name}
                        isOptionEqualToValue={(option, value) => option.uuid === value.uuid && option.storeId === value.storeId}
                        options={evotorProductOptions}
                        value={selectedEvotorProduct}
                        fullWidth={true}
                    />
                    {selectedEvotorProduct && (
                        <EvotorDataWrapper>
                            <EvotorProductData evotorProduct={selectedEvotorProduct} />
                        </EvotorDataWrapper>
                    )}

                    <Stack
                        direction={'row'}
                        alignItems="center"
                        flexWrap="wrap"
                        justifyContent="flex-end"
                        gap={1}
                        marginTop={2}
                    >
                        {externalId && (
                            <>
                                <Button disabled={isLoading} variant="contained" color="error" onClick={toggleDeleteConfirmModal}>
                                    Удалить связь
                                </Button>
                                <Button disabled={isLoading} variant="contained" color="warning" onClick={onCancel}>
                                    Отменить изменения
                                </Button>
                            </>
                        )}

                        <Button disabled={isLoading || (!selectedEvotorProduct && !hasSavedMutation)} variant="contained" color="success" onClick={onSave}>
                            {hasSavedMutation ? 'Обновить товар' : 'Сохранить'}
                        </Button>
                    </Stack>
                </ContentWrapper>
            </Wrapper>
        </Modal>
    );
};

export default ExternalIdModal;
