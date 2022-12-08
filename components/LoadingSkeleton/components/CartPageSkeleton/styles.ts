import styled from 'styled-components';

export const WrappedItem = styled.div<{ flex: string }>`
    flex: ${(p) => p.flex};
`;
