import styled from 'styled-components';

export const ChildWrapper = styled.div<{ visible: boolean }>`
    order: ${(p) => (p.visible ? 0 : 100)};
    visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};
`;
