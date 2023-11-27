import { FC } from 'react';
import { IProps } from './interfaces';
import ImagesSlider from './components/ImagesSlider/ImagesSlider';

/**
 * Секция изображения
 */
const ProductImagesSection: FC<IProps> = ({ product }) => {
    if (!product) {
        return null;
    }

    return <ImagesSlider productId={product.id} images={product.product_image} />;
};

export default ProductImagesSection;
