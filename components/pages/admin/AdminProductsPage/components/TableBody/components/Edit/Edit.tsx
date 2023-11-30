import { FC } from 'react';
import { ITableColumnProps } from '../../../../interfaces';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

/**
 * Компонент для отображения кнопки при нажатии на которую происходит
 * редирект на страницу редактирования товара
 */
const Edit: FC<ITableColumnProps> = ({ product }) => {
    const router = useRouter();

    const onEditClick = () => {
        router.push(`products/${product.id}`);
    };

    return (
        <IconButton onClick={onEditClick}>
            <EditIcon />
        </IconButton>
    );
};

export default Edit;
