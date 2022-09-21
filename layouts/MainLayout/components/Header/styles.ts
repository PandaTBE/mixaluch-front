import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: ${(p) => p.theme.backgroundColors.primary}; ;
`;

export const ContentWrapper = styled.div`
    min-height: 35px;
    padding: 5px 0;
    display: flex;
    align-items: center;
`;

export const Delivery = styled.div`
    color: ${(p) => p.theme.colors.grey};
`;

export const Telephone = styled.a`
    cursor: pointer;
`;

export const StyledLink = styled.div<{ active: boolean }>`
    color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.black)};
`;
