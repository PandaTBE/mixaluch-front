import { ChangeEvent, FC, useEffect, useId, useState } from 'react';
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
import { DEFAULT_MODAL_STYLES } from '../../../../../../../../constants/modal';
import PageTitle from '../../../../../../../PageTitle/PageTitle';
import { theme } from '../../../../../../../../constants/theme';
import HistoryIcon from '@mui/icons-material/History';
import DeleteConfirmModal from '../../../DeleteConfirmModal/DeleteConfirmModal';
import { productApi } from '../../../../../../../../services/ProductService';
import { isUndefined } from 'lodash';
import { IProductImageDTO } from '../../../../../../../../models/Product';
import {
    CREATE_PRODUCT_IMAGE_QUERY_KEY,
    DELETE_PRODUCT_IMAGE_QUERY_KEY,
    UPDATE_PRODUCT_IMAGE_QUERY_KEY,
} from '../../constants/constants';
import { DS } from '../../../../../../../../constants/constants';
import useHandleResults from './hooks/useHandleResults';

/**
 * Компонент для отображения модального окна для редактирования картинки товара и добавления новой
 */
const ImageModal: FC<IProps> = ({ modalState, toggleEditImageOpen }) => {
    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [isCanceled, setIsCanceled] = useState({});

    const requestsId = useId();

    const [createProductImage, createProductImageResult] = productApi.useCreateProductImageMutation({
        fixedCacheKey: `${CREATE_PRODUCT_IMAGE_QUERY_KEY}${DS}${requestsId}`,
    });
    const [updateProductImage, updateProductImageResult] = productApi.useUpdateProductImageMutation({
        fixedCacheKey: `${UPDATE_PRODUCT_IMAGE_QUERY_KEY}${DS}${requestsId}`,
    });
    const [deleteProductImage, deleteProductImageResult] = productApi.useDeleteProductImageMutation({
        fixedCacheKey: `${DELETE_PRODUCT_IMAGE_QUERY_KEY}${DS}${requestsId}`,
    });

    useHandleResults(requestsId, modalState.productId);

    const initialValues = {
        alt_text: '',
        is_feature: false,
    };

    const validationSchema = yup.object({
        alt_text: yup.string().max(255, 'Максимальное число символов - 255'),
        is_feature: yup.boolean(),
    });

    const onSubmit = (formValues: { alt_text: string; is_feature: boolean; image?: File }) => {
        if (modalState.image) {
            updateProductImage({ data: { ...formValues, product: modalState.productId }, id: modalState.image.id });
        } else {
            if (!isUndefined(formValues.image)) {
                createProductImage({ ...formValues, product: modalState.productId } as IProductImageDTO);
            }
        }
        toggleEditImageOpen(null);
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
        if (modalState.image) {
            deleteProductImage(modalState.image.id);
        }
        toggleEditImageOpen(null);
    };

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const onCancel = () => {
        setIsCanceled({});
    };

    const onImageChange =
        (setFieldValue: (field: string, value: File) => void) => (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) {
                setFieldValue('image', e.target.files[0]);
            }
        };

    const isLoading =
        createProductImageResult.isLoading || updateProductImageResult.isLoading || deleteProductImageResult.isLoading;

    return (
        <Modal onClose={() => toggleEditImageOpen(modalState.image)} open={modalState.open}>
            <Wrapper style={DEFAULT_MODAL_STYLES}>
                <Modal onClose={toggleDeleteConfirmModal} open={isDeleConfirmModalOpen}>
                    <DeleteConfirmModal
                        bodyText={'Вы уверены, что хотите удалить изображение?'}
                        titleText={'Удаление изображения'}
                        deleteConfirm={onDeleteConfirm}
                        toggleOpen={toggleDeleteConfirmModal}
                    />
                </Modal>
                <PageTitle text={modalState.image ? 'Редактирование изображения' : 'Добавление нового изображения'} />
                <CloseIconWrapper onClick={() => toggleEditImageOpen(modalState.image)}>
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
                                        disabled={isLoading}
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
                                                disabled={isLoading}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                onChange={formik.handleChange}
                                                checked={formik.values.is_feature}
                                                name="is_feature"
                                            />
                                        }
                                        label="Это основное изображение?"
                                    />

                                    <MaterialButton
                                        disabled={isLoading}
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
                                        disabled={isLoading}
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        color="success"
                                    >
                                        Сохранить изменения
                                    </MaterialButton>
                                    <MaterialButton
                                        disabled={isLoading}
                                        variant="contained"
                                        startIcon={<HistoryIcon />}
                                        color="warning"
                                        onClick={onCancel}
                                    >
                                        Отменить изменения
                                    </MaterialButton>
                                    {modalState.image && (
                                        <MaterialButton
                                            disabled={isLoading}
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
