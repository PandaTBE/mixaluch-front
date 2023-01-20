import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
`;

export const WrapperItem = styled.div`
    flex: 0 0 50%;
    :first-child {
        padding-right: 15px;
    }

    :last-child {
        padding-left: 15px;
    }
`;
