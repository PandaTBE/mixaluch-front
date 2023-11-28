import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { IProps, TExtendedEvotorProduct } from './interfaces';
import { Button, Modal, Stack } from '@mui/material';
import { DEFAULT_MODAL_STYLES } from '../../../../../../../constants/modal';
import PageTitle from '../../../../../../PageTitle/PageTitle';
import { ContentWrapper, EvotorDataWrapper, Wrapper } from './styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { evotorReducerValues } from '../../../../../../../slices/Evotor/evotor';
import { IEvotorProduct } from '../../../../../../../models/Evotor';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../../../constants/admin';
import EvotorProductData from '../../../EvotorProductData/EvotorProductData';

const ExternalIdModal: FC<IProps> = ({ isOpen, toggleOpen, productId, externalId }) => {
    const { productsByStoreId, storesById, productsByStoreIdByProductId } = useSelector(evotorReducerValues);
    const [isCanceled, setIsCanceled] = useState({});

    const [selectedEvotorProduct, setSelectedEvotorProduct] = useState<undefined | TExtendedEvotorProduct | null>();

    useEffect(() => {
        if (externalId && productsByStoreIdByProductId && externalId.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE) {
            const splittedId = externalId.external_id.split('/');
            const product = productsByStoreIdByProductId[splittedId?.[0]]?.[splittedId?.[1]] as
                | undefined
                | IEvotorProduct;

            if (product) {
                setSelectedEvotorProduct({ ...product, storeId: splittedId[0] });
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
        //
    };

    return (
        <Modal open={isOpen} onClose={toggleOpen}>
            <Wrapper style={DEFAULT_MODAL_STYLES}>
                <PageTitle text={externalId ? 'Редактировать связь с Эвотор' : 'Создать связь с Эвотор'} />
                <ContentWrapper>
                    <Autocomplete
                        renderOption={(props, option: TExtendedEvotorProduct) => {
                            return (
                                <li {...props} key={`${option.storeId}_${option.uuid}`}>
                                    {option.name}
                                </li>
                            );
                        }}
                        onChange={(_: SyntheticEvent<Element, Event>, newValue) => {
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

                    <Stack direction={'row'} alignItems="center" justifyContent="flex-end" gap={1} marginTop={2}>
                        {externalId && (
                            <Button variant="contained" color="warning" onClick={onCancel}>
                                Отменить изменения
                            </Button>
                        )}

                        <Button variant="contained" color="success">
                            Сохранить
                        </Button>
                    </Stack>
                </ContentWrapper>
            </Wrapper>
        </Modal>
    );
};

export default ExternalIdModal;
