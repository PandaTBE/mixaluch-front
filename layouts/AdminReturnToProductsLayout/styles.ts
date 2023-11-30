import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-bottom: 20px;
`;

export const LinkText = styled.a`
    text-decoration: underline;
    color: ${(p) => p.theme.colors.primary};
    cursor: pointer;
    line-height: 16px;
`;

export const ContentWrapper = styled.div`
    padding-top: 15px;
`;
