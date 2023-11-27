import { FC } from 'react';
import { IProps } from './interfaces';
import ImagesSlider from './components/ImagesSlider/ImagesSlider';

const ProductImagesSection: FC<IProps> = ({ product }) => {
    if (!product) {
        return null;
    }

    if (!product.product_image?.length) {
        return null;
    }

    return <ImagesSlider images={product.product_image} />;
};

export default ProductImagesSection;
