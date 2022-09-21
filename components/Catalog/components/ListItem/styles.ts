import styled from 'styled-components';

export const Wrapper = styled.div`
    border-bottom: ${(p) => `1px solid ${p.theme.border.primary}`};
    cursor: pointer;
`;

export const Text = styled.div`
    width: 100%;
    padding: 10px 0;
    :hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const ParentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ChildWrapper = styled.div`
    cursor: pointer;
`;

export const ChildText = styled.div`
    padding: 10px 0;
    padding-left: 20px;
    :hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;
