import styled from 'styled-components';

export const ContentWrapper = styled.div`
    margin-top: 40px;
`;

export const CartItemsWrapper = styled.div`
    width: 100%;
`;

export const TotalValueWrapper = styled.div`
    background-color: #f7f7f7;
    border-radius: 5px;
    padding: 20px;
`;

export const TotalValueTitle = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: bold;
    span {
        margin-right: 5px;
        :last-child {
            margin-right: 0px;
        }
    }
`;

export const ConfirmButtonWrapper = styled.div`
    margin-top: 15px;
`;
