import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px 0;
`;

export const Text = styled.div<{ fontWeight?: number }>`
    margin-top: 20px;
    font-weight: ${(p) => p.fontWeight || 'normal'};
`;
