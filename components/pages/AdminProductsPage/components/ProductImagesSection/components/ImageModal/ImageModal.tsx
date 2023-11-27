import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IProps } from './interfaces';
import { FormControlLabel, Grid, IconButton, Modal, Stack, TextField, Button as MaterialButton } from '@mui/material';
import { CloseIconWrapper, ContentWrapper, HiddenInput, ImageWrapper, StyledCheckbox, Wrapper } from './styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Image from 'next/image';
import * as yup from 'yup';
import { useFormik } from 'formik';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import DeleteConfirmModal from './components/DeleteConfirmModal/DeleteConfirmModal';
import { DEFAULT_MODAL_STYLES } from '../../../../../../../constants/modal';
import PageTitle from '../../../../../../PageTitle/PageTitle';
import { theme } from '../../../../../../../constants/theme';
import HistoryIcon from '@mui/icons-material/History';

/**
 * Компонент для отображения модального окна для редактирования картинки товара и добавления новой
 */
const ImageModal: FC<IProps> = ({ modalState, toggleEditImageOpen }) => {
    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [isCanceled, setIsCanceled] = useState({});
    const initialValues = {
        alt_text: '',
        is_feature: false,
    };

    const validationSchema = yup.object({
        alt_text: yup.string().max(255, 'Максимальное число символов - 255'),
        is_feature: yup.boolean(),
    });

    const onSubmit = (formValues: { alt_text: string; is_feature: boolean; image?: File }) => {
        console.log(formValues);

        if (modalState.image) {
            console.log('edit');
        } else {
            console.log('create');
        }
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    useEffect(() => {
        if (modalState.image) {
            formik.setValues({
                is_feature: modalState.image.is_feature,
                alt_text: modalState.image.alt_text,
            });
        }
    }, [modalState.image, isCanceled]);

    useEffect(() => {
        if (!formik.values.alt_text && formik.values.image) {
            formik.setFieldValue('alt_text', formik.values.image.name);
        }
    }, [formik.values.image]);

    const onDeleteConfirm = () => {
        console.log('delete confirm');
    };

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const onCancel = () => {
        setIsCanceled({});
        formik.resetForm();
    };

    const onImageChange =
        (setFieldValue: (field: string, value: File) => void) => (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) {
                setFieldValue('image', e.target.files[0]);
            }
        };

    return (
        <Modal onClose={toggleEditImageOpen(modalState.image)} open={modalState.open}>
            <Wrapper style={DEFAULT_MODAL_STYLES}>
                <Modal onClose={toggleDeleteConfirmModal} open={isDeleConfirmModalOpen}>
                    <DeleteConfirmModal deleteConfirm={onDeleteConfirm} toggleOpen={toggleDeleteConfirmModal} />
                </Modal>
                <PageTitle text={modalState.image ? 'Редактирование изображения' : 'Добавление нового изображения'} />
                <CloseIconWrapper onClick={toggleEditImageOpen(modalState.image)}>
                    <IconButton>
                        <CloseRoundedIcon htmlColor={theme.colors.primary} />
                    </IconButton>
                </CloseIconWrapper>
                <ContentWrapper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <ImageWrapper isNoImage={!modalState.image && !formik.values.image}>
                                {!modalState.image && !formik.values.image && <span>Здесь пока нет изображения</span>}

                                {(modalState.image?.image || formik.values.image) && (
                                    <Image
                                        objectFit="fill"
                                        sizes={'inherit'}
                                        src={
                                            formik.values.image
                                                ? URL.createObjectURL(formik.values.image)
                                                : modalState.image?.image || ''
                                        }
                                        layout="fill"
                                    />
                                )}
                            </ImageWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <form onSubmit={formik.handleSubmit}>
                                <Stack gap={2}>
                                    <TextField
                                        error={formik.touched.alt_text && Boolean(formik.errors.alt_text)}
                                        helperText={formik.touched.alt_text && formik.errors.alt_text}
                                        onChange={formik.handleChange}
                                        value={formik.values.alt_text}
                                        label={'Название картинки'}
                                        variant="outlined"
                                        name={'alt_text'}
                                        fullWidth={true}
                                    />
                                    <FormControlLabel
                                        control={
                                            <StyledCheckbox
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                onChange={formik.handleChange}
                                                checked={formik.values.is_feature}
                                                name="is_feature"
                                            />
                                        }
                                        label="Это основное изображение?"
                                    />

                                    <MaterialButton
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        <span>{formik.values.image?.name || 'Новое изображение'}</span>
                                        <HiddenInput
                                            accept="image/*"
                                            onChange={onImageChange(formik.setFieldValue)}
                                            type="file"
                                        />
                                    </MaterialButton>
                                    <MaterialButton
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        color="success"
                                    >
                                        Сохранить изменения
                                    </MaterialButton>
                                    <MaterialButton
                                        type="submit"
                                        variant="contained"
                                        startIcon={<HistoryIcon />}
                                        color="warning"
                                        onClick={onCancel}
                                    >
                                        Отменить изменения
                                    </MaterialButton>
                                    {modalState.image && (
                                        <MaterialButton
                                            component="label"
                                            variant="contained"
                                            startIcon={<DeleteIcon />}
                                            color="error"
                                            onClick={toggleDeleteConfirmModal}
                                        >
                                            Удалить изображение
                                        </MaterialButton>
                                    )}
                                </Stack>
                            </form>
                        </Grid>
                    </Grid>
                </ContentWrapper>
            </Wrapper>
        </Modal>
    );
};

export default ImageModal;
