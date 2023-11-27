import { CSSProperties, FC, useState } from 'react';
import { IProps } from './interfaces';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { AddNewWrapper, EditWrapper } from './styles';
import { IconButton, Tooltip } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditImageModal from '../EditImageModal/EditImageModal';
import { IEditImageModalState } from '../EditImageModal/interfaces';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IProductImage } from '../../../../../../../models/Product';
import { theme } from '../../../../../../../constants/theme';

/**
 * Слайдер для всех картинок товара
 */
const ImagesSlider: FC<IProps> = ({ images }) => {
    const [editImageModalState, setEditImageModalState] = useState<IEditImageModalState>({
        open: false,
        image: null,
    });

    const toggleEditImageOpen = (image: IProductImage | null) => () => {
        setEditImageModalState((prevState) => ({
            ...prevState,
            open: !prevState.open,
            image: prevState.open ? null : image,
        }));
    };

    return (
        <>
            <EditImageModal modalState={editImageModalState} toggleEditImageOpen={toggleEditImageOpen} />
            <Swiper
                style={
                    {
                        '--swiper-navigation-color': theme.colors.primary,
                        '--swiper-pagination-color': theme.colors.primary,
                        '--swiper-navigation-size': '30px',
                        height: '300px',
                    } as CSSProperties
                }
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={true}
                loop={true}
            >
                <AddNewWrapper>
                    <Tooltip title={'Добавить новое изображение'}>
                        <IconButton>
                            <AddPhotoAlternateIcon fontSize="medium" htmlColor={theme.colors.primary} />
                        </IconButton>
                    </Tooltip>
                </AddNewWrapper>
                {images.map((image) => (
                    <SwiperSlide key={image.id}>
                        <EditWrapper>
                            <Tooltip title={'Редактировать изображение'}>
                                <IconButton onClick={toggleEditImageOpen(image)}>
                                    <EditRoundedIcon fontSize="medium" htmlColor={theme.colors.primary} />
                                </IconButton>
                            </Tooltip>
                        </EditWrapper>

                        <Image alt={image.alt_text} src={image.image} objectFit="scale-down" layout="fill" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ImagesSlider;
