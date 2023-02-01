import styled from 'styled-components';

export const WrappedItem = styled.div<{ flex: string }>`
    flex: ${(p) => p.flex};
`;

export const Wrapper = styled.div`
    padding: 20px 0;
`;

export const ContentWrapper = styled.div`
    margin-top: 40px;

    @media (max-width: 575px) {
        margin-top: 20px;
    }
`;
