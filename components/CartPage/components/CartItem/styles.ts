import styled from 'styled-components';

export const ProductImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const Wrapper = styled.div`
    padding: 10px;
    border-radius: 5px;
    border: ${(p) => `1px solid ${p.theme.border.primary}`};
`;
