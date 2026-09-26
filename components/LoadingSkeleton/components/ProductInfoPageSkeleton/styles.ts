import styled from 'styled-components';
import { Stack } from '@mui/material';
import { MainSwiper } from '../../../pages/ProductInfoPage/styles';

export const BackLinkPlaceholder = styled.div`
    margin-bottom: 24px;
`;

export const ThumbnailPlaceholder = styled.div`
    flex: 1;
    min-height: 0;
    line-height: 0;
`;

export const MainImagePlaceholder = styled(MainSwiper)`
    width: 100%;
    line-height: 0;
`;

export const ImageGallery = styled(Stack)`
    && {
        height: 400px;
        @media (min-width: 600px) {
            height: 300px;
        }
        @media (min-width: 900px) {
            height: 500px;
        }
    }
`;

export const ThumbnailList = styled(Stack)`
    && {
        gap: 10px;
        height: 100%;
    }
`;

export const ProductActions = styled(Stack)`
    && {
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
    }
`;
