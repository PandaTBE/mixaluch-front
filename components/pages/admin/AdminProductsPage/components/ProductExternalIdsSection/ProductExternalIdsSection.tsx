import { FC, useMemo, useState } from 'react';
import { IProps } from './interfaces';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../../constants/admin';
import { useSelector } from 'react-redux';

import { evotorReducerValues } from '../../../../../../slices/Evotor/evotor';
import { Title, Wrapper } from './styles';
import EvotorProductData from '../EvotorProductData/EvotorProductData';
import { Button, Stack } from '@mui/material';
import ExternalIdModal from './components/ExternalIdModal/ExternalIdModal';

const ProductExternalIdsSection: FC<IProps> = ({ product }) => {
    const { productsByStoreIdByProductId } = useSelector(evotorReducerValues);
    const [isExternalIdModalOpen, setExternalIdModalOpen] = useState(false);

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

    const toggleExternalIdModal = () => {
        setExternalIdModalOpen((prevState) => !prevState);
    };

    if (!product) {
        return null;
    }

    if (!evotorProduct) {
        return (
            <Wrapper>
                <ExternalIdModal
                    isOpen={isExternalIdModalOpen}
                    toggleOpen={toggleExternalIdModal}
                    product={product}
                    externalId={externalId}
                />
                <Title>Нет связи с эвотор</Title>
                <Button variant="contained" onClick={toggleExternalIdModal}>
                    Создать связь
                </Button>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <ExternalIdModal
                isOpen={isExternalIdModalOpen}
                toggleOpen={toggleExternalIdModal}
                product={product}
                externalId={externalId}
            />

            <EvotorProductData evotorProduct={evotorProduct} />
            <Stack flexWrap={'wrap'} direction={'row'} alignItems="center" gap={1} marginTop={1}>
                <Button variant="contained" color="warning" onClick={toggleExternalIdModal}>
                    Изменить связь
                </Button>
            </Stack>
        </Wrapper>
    );
};

export default ProductExternalIdsSection;
