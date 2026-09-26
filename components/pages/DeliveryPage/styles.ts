import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 760px;
    padding: 20px 0 48px;
    line-height: 1.6;
`;

export const Text = styled.div<{ fontWeight?: number }>`
    margin-top: 20px;
    font-weight: ${(p) => p.fontWeight || 'normal'};
`;
