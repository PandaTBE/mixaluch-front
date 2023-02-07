import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: ${(p) => p.theme.backgroundColors.primary};
    min-height: 100px;
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
