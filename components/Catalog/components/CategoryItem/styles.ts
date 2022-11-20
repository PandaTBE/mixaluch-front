import styled from 'styled-components';

export const Wrapper = styled.div`
    border-bottom: ${(p) => `1px solid ${p.theme.border.primary}`};
    cursor: pointer;
`;

export const Text = styled.div<{ isSelected: boolean; isChild?: boolean }>`
    width: 100%;
    padding: 10px 0;
    color: ${(p) => (p.isSelected ? p.theme.colors.primary : 'inherit')};
    padding-left: ${(p) => (p.isChild ? '20px' : 0)};
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
