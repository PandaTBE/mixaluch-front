import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const SwiperWrapper = styled.div`
    margin-top: 15px;
`;

export const StyledArrowBackIcon = styled(ArrowBackIcon)`
    fill: ${(p) => p.theme.colors.primary};
    cursor: pointer;
`;

export const StyledArrowForwardIcon = styled(ArrowForwardIcon)`
    fill: ${(p) => p.theme.colors.primary};
    cursor: pointer;
`;

export const Wrapper = styled.section`
    padding-bottom: 50px;
`;
