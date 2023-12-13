import { FC, useMemo } from 'react';
import { ITableColumnProps } from '../../../../interfaces';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../../../../constants/admin';
import { useSelector } from 'react-redux';
import { evotorReducerValues } from '../../../../../../../../slices/Evotor/evotor';
import { IEvotorProduct } from '../../../../../../../../models/Evotor';

const ExternalIds: FC<ITableColumnProps> = ({ product }) => {
    const { productsByStoreIdByProductId } = useSelector(evotorReducerValues);

    const evotorProduct: null | IEvotorProduct = useMemo(() => {
        const externalId = product.external_ids.find((item) => item.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE);
        if (externalId && productsByStoreIdByProductId) {
            const splittedId = externalId.external_id.split('/');
            const product = productsByStoreIdByProductId[splittedId[0]]?.[splittedId[1]];

            return product || null;
        }

        return null;
    }, []);

    if (evotorProduct) {
        return <span>Есть связь с Evotor</span>;
    }
    return <span>Нет связи с Evotor</span>;
};

export default ExternalIds;
