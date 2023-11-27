import { FC } from 'react';
import { ITableColumnProps } from '../../../../interfaces';
import { EVOTOR_EXTERNAL_ID_DATA_SOURCE } from '../../../../../../../constants/admin';

const ExternalIds: FC<ITableColumnProps> = ({ product }) => {
    if (product.external_ids?.[0]?.data_source === EVOTOR_EXTERNAL_ID_DATA_SOURCE) {
        return <span>Есть связь с Evotor</span>;
    }
    return <span>Нет связи с Evotor</span>;
};

export default ExternalIds;
