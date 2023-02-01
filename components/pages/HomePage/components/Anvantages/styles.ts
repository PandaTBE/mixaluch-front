import styled from 'styled-components';

import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export const Wrapper = styled.section`
    padding-bottom: 50px;
    @media (max-width: 575px) {
        padding-bottom: 25px;
    }
`;

export const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
    margin: 0;

    @media (max-width: 575px) {
        font-size: 28px;
    }
`;

export const StyledInventoryOutlinedIcon = styled(InventoryOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    height: 100px !important;
    width: 100px !important;

    @media (max-width: 575px) {
        height: 50px !important;
        width: 50px !important;
    }
`;

export const StyledThumbUpAltOutlinedIcon = styled(ThumbUpAltOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    height: 100px !important;
    width: 100px !important;
    @media (max-width: 575px) {
        height: 50px !important;
        width: 50px !important;
    }
`;

export const StyledTVerifiedUserOutlinedIcon = styled(VerifiedUserOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    height: 100px !important;
    width: 100px !important;
    @media (max-width: 575px) {
        height: 50px !important;
        width: 50px !important;
    }
`;

export const CardsWrapper = styled.div`
    margin-top: 20px;
`;
