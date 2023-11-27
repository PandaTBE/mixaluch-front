import { FC, forwardRef } from 'react';
import { IProps } from './interfaces';
import { Text, Wrapper } from './styles';
import { Button, Stack } from '@mui/material';
import { DEFAULT_MODAL_STYLES } from '../../../../../../../constants/modal';
import PageTitle from '../../../../../../PageTitle/PageTitle';

/**
 * Модальное окно для подтверждения удаления изображения товара
 */
const DeleteConfirmModal: FC<IProps> = forwardRef<HTMLDivElement, IProps>(({ toggleOpen, deleteConfirm }, ref) => {
    const onCancel = () => {
        toggleOpen();
    };

    const onConfirm = () => {
        deleteConfirm();
        toggleOpen();
    };

    return (
        <Wrapper style={DEFAULT_MODAL_STYLES} ref={ref} tabIndex={-1}>
            <PageTitle text={'Удалить товар?'} />
            <Text>Вы уверены, что хотите удалить товар?</Text>

            <Stack direction="row" alignItems="center" gap={1} justifyContent="flex-end" marginTop={2}>
                <Button onClick={onCancel} variant="contained" color="primary">
                    Отмена
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Удалить
                </Button>
            </Stack>
        </Wrapper>
    );
});

export default DeleteConfirmModal;
