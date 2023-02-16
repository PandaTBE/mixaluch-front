import styled from 'styled-components';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

export const Wrapper = styled.div`
    background-color: ${(p) => p.theme.backgroundColors.primary};
    min-height: 100px;
    position: relative;
`;

export const StyledLink = styled.div<{ active: boolean }>`
    color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.black)};
    white-space: nowrap;
`;

export const ContentWrapper = styled.div`
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Delivery = styled.div`
    color: ${(p) => p.theme.colors.grey};
    white-space: nowrap;
    margin-top: 15px;
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

export const LastOrderWrapper = styled.div<{ clicked: boolean }>`
    cursor: pointer;
    z-index: 100;
    position: fixed;
    transition: 0.3s all;
    bottom: 20px;
    right: 20px;

    width: ${(p) => (p.clicked ? '200px' : '50px')};
    height: 50px;
    background-color: ${(p) => p.theme.colors.primary};

    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    border-radius: 25px;
`;

export const LastOrderText = styled.div`
    color: white;
    text-decoration: underline;
    cursor: pointer;
    white-space: nowrap;
`;
