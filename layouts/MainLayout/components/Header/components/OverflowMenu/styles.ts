import styled from 'styled-components';

export const Wrapper = styled.div`
    order: 99;
    position: sticky;
    right: 0;
    background-color: ${(p) => p.theme.backgroundColors.primary};
`;
