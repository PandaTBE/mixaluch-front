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
import { productReducerValues } from '../../../../../../../../slices/Product/product';
import ErrorMessage from '../../../../../../../ErrorMessage/ErrorMessage';
import { IExternalIdDTO, IProduct } from '../../../../../../../../models/Product';
import { productApi } from '../../../../../../../../services/ProductService';
import {
    CREATE_EXTERNAL_ID_QUERY_KEY,
    DELETE_EXTERNAL_ID_QUERY_KEY,
    UPDATE_EXTERNAL_ID_QUERY_KEY,
} from './constants/constants';
import { DS } from '../../../../../../../../constants/constants';
import useHandleResults from './hooks/useHandleResults';
import DeleteConfirmModal from '../../../DeleteConfirmModal/DeleteConfirmModal';

const ExternalIdModal: FC<IProps> = ({ isOpen, toggleOpen, product, externalId }) => {
    const requestsId = useId();

    const { productsByStoreId, storesById, productsByStoreIdByProductId } = useSelector(evotorReducerValues);
    const { products } = useSelector(productReducerValues);

    const [createExternalId, createExternalIdResult] = productApi.useCreateExternalIdMutation({
        fixedCacheKey: `${CREATE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    });

    const [deleteExternalId, deleteExternalIdResult] = productApi.useDeleteExternalIdMutation({
        fixedCacheKey: `${DELETE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    });

    const [updateExternalId, updateExternalIdResult] = productApi.useUpdateExternalIdMutation({
        fixedCacheKey: `${UPDATE_EXTERNAL_ID_QUERY_KEY}${DS}${requestsId}`,
    });

    const [selectedEvotorProduct, setSelectedEvotorProduct] = useState<undefined | TExtendedEvotorProduct | null>();
    const [isExternalIdExists, setIsExternalIdExists] = useState<{ isExists: boolean; product: null | IProduct }>({
        isExists: false,
        product: null,
    });
    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const [isCanceled, setIsCanceled] = useState({});

    useHandleResults(requestsId, product);

    useEffect(() => {
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

    const onSave = () => {
        if (selectedEvotorProduct) {
            const selectedEvotorProductExternalId = `${selectedEvotorProduct.storeId}/${selectedEvotorProduct.uuid}`;
            const isExists = (products || []).find((product) => {
                return product.external_ids.find((externalId) => {
                    return (
                        externalId.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE &&
                        externalId.external_id === selectedEvotorProductExternalId
                    );
                });
            });

            if (isExists) {
                setIsExternalIdExists({ isExists: true, product: isExists });
            } else {
                const result: IExternalIdDTO = {
                    data_source: EVOTOR_EXTERNAL_ID_DATA_SOURCE,
                    external_id: selectedEvotorProductExternalId,
                    product: product.id,
                };
                if (externalId) {
                    updateExternalId({ id: externalId.id, data: result });
                } else {
                    createExternalId(result);
                }
                toggleOpen();
            }
        }
    };

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const onDeleteConfirm = () => {
        if (externalId) {
            deleteExternalId(externalId.id);
            toggleOpen();
        }
    };

    const isLoading =
        createExternalIdResult.isLoading || deleteExternalIdResult.isLoading || updateExternalIdResult.isLoading;

    return (
        <Modal open={isOpen} onClose={toggleOpen}>
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
                        {isExternalIdExists.isExists && (
                            <ErrorMessage
                                text={`Этот товар из Эвотор уже имеет связь c ${isExternalIdExists.product?.title}`}
                            />
                        )}
                        {createExternalIdResult.isError && (
                            <ErrorMessage text={`При создании связи с Эвотор возникла ошибка`} />
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
                            setIsExternalIdExists({ isExists: false, product: null });
                            setSelectedEvotorProduct(newValue);
                        }}
                        groupBy={(option: TExtendedEvotorProduct) =>
                            storesById?.[option.storeId]?.name || option.storeId
                        }
                        renderInput={(params) => <TextField {...params} label="Товар из Эвотор" />}
                        getOptionLabel={(option: IEvotorProduct) => option.name}
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
                                <Button variant="contained" color="error" onClick={toggleDeleteConfirmModal}>
                                    Удалить связь
                                </Button>
                                <Button disabled={isLoading} variant="contained" color="warning" onClick={onCancel}>
                                    Отменить изменения
                                </Button>
                            </>
                        )}

                        <Button disabled={isLoading} variant="contained" color="success" onClick={onSave}>
                            Сохранить
                        </Button>
                    </Stack>
                </ContentWrapper>
            </Wrapper>
        </Modal>
    );
};

export default ExternalIdModal;
