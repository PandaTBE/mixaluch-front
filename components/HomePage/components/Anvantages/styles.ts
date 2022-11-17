import styled from 'styled-components';

import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export const Wrapper = styled.section`
    padding-bottom: 30px;
`;

export const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
    margin: 0;
`;

export const StyledInventoryOutlinedIcon = styled(InventoryOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary};
    height: 100px;
    width: 100px;
`;

export const StyledThumbUpAltOutlinedIcon = styled(ThumbUpAltOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary};
    height: 100px;
    width: 100px;
`;

export const StyledTVerifiedUserOutlinedIcon = styled(VerifiedUserOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary};
    height: 100px;
    width: 100px;
`;

export const CardsWrapper = styled.div`
    margin-top: 20px;
`;
