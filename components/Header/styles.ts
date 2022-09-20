import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: #f7f7f7;
`;

export const ContentWrapper = styled.div`
    min-height: 35px;
    padding: 5px 0;
    display: flex;
    align-items: center;
`;

export const Delivery = styled.div`
    color: ${(p) => p.theme.colors.grey};
`;

export const Telephone = styled.a`
    cursor: pointer;
`;

export const List = styled.ul`
    list-style-type: none;
    display: flex;
`;

export const ListItem = styled.li``;
