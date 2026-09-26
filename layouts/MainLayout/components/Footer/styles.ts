import { Stack } from '@mui/material';
import styled from 'styled-components';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

export const Wrapper = styled.div`
    background-color: white;
    border-top: 1px solid #eceae7;
    min-height: 100px;
    position: relative;
`;

export const StyledLink = styled.div<{ active: boolean }>`
    color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.black)};
    white-space: nowrap;
`;

export const ContentWrapper = styled.div`
    padding: 26px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Delivery = styled.div`
    color: ${(p) => p.theme.colors.grey};
    white-space: nowrap;
    margin-top: 10px;
    font-size: 13px;
`;

export const LogoWrapper = styled.div`
    width: 220px;
    cursor: pointer;
    margin-top: 15px;
    position: relative;
    height: 32px;

    @media (max-width: 575px) {
        width: 150px;
        height: 22px;
    }
`;

export const StyledLocalMallOutlinedIcon = styled(LocalMallOutlinedIcon)`
    fill: white !important;
`;

export const LastOrderWrapper = styled.button`
    cursor: pointer;
    z-index: 100;
    position: fixed;
    bottom: 20px;
    right: 20px;

    padding: 0 18px;
    height: 50px;
    border: 0;
    background-color: ${(p) => p.theme.colors.primary};
    color: white;
    font: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    border-radius: 25px;

    &:hover {
        filter: brightness(0.92);
    }

    @media (max-width: 575px) {
        right: 12px;
        bottom: 12px;
        padding: 0 14px;
    }
`;

export const FooterNavigation = styled(Stack)`
    && {
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
`;
