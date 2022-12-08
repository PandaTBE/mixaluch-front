import styled from 'styled-components';

export const ItemWrapper = styled.div<{ flex: string }>`
    flex: ${(p) => p.flex};
`;

export const NavItemWrapper = styled.div`
    margin-top: 15px;
    :first-child {
        margin-top: 0px;
    }
`;
