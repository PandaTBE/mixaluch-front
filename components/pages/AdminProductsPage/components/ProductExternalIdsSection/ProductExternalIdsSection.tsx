import { FC, useMemo, useState } from 'react';
import { IProps } from './interfaces';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../constants/admin';
import { useSelector } from 'react-redux';

import { evotorReducerValues } from '../../../../../slices/Evotor/evotor';
import { Title } from './styles';
import EvotorProductData from '../EvotorProductData/EvotorProductData';
import { Button, Modal, Stack } from '@mui/material';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import ExternalIdModal from './components/ExternalIdModal/ExternalIdModal';

const ProductExternalIdsSection: FC<IProps> = ({ product }) => {
    const { productsByStoreIdByProductId } = useSelector(evotorReducerValues);
    const [isExternalIdModalOpen, setExternalIdModalOpen] = useState(false);

    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const [externalId, evotorProduct] = useMemo(() => {
        if (product?.external_ids?.length) {
            const externalId = product.external_ids.find((item) => item.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE);

            if (externalId && productsByStoreIdByProductId) {
                const splittedId = externalId.external_id.split('/');
                const product = productsByStoreIdByProductId[splittedId[0]]?.[splittedId[1]];

                return [externalId, product || null];
            }
        }

        return [];
    }, [product, productsByStoreIdByProductId]);

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const toggleExternalIdModal = () => {
        setExternalIdModalOpen((prevState) => !prevState);
    };

    const onDeleteConfirm = () => {
        console.log('delete');
    };

    if (!product) {
        return null;
    }

    if (!evotorProduct) {
        return (
            <div>
                <ExternalIdModal
                    isOpen={isExternalIdModalOpen}
                    toggleOpen={toggleExternalIdModal}
                    productId={product.id}
                    externalId={externalId}
                />
                <Title>Нет связи с эвотор</Title>
                <Button variant="contained" color="success" onClick={toggleExternalIdModal}>
                    Создать связь
                </Button>
            </div>
        );
    }

    return (
        <div>
            <ExternalIdModal
                isOpen={isExternalIdModalOpen}
                toggleOpen={toggleExternalIdModal}
                productId={product.id}
                externalId={externalId}
            />
            <Modal onClose={toggleDeleteConfirmModal} open={isDeleConfirmModalOpen}>
                <DeleteConfirmModal
                    bodyText={'Вы уверены, что хотите удалить связь с Эвотор?'}
                    titleText={'Удаление связи с Эвотор'}
                    deleteConfirm={onDeleteConfirm}
                    toggleOpen={toggleDeleteConfirmModal}
                />
            </Modal>
            <EvotorProductData evotorProduct={evotorProduct} />
            <Stack flexWrap={'wrap'} direction={'row'} alignItems="center" gap={1} marginTop={1}>
                <Button variant="contained" color="warning" onClick={toggleExternalIdModal}>
                    Изменить связь
                </Button>
                <Button variant="contained" color="error" onClick={toggleDeleteConfirmModal}>
                    Удалить связь
                </Button>
            </Stack>
        </div>
    );
};

export default ProductExternalIdsSection;
