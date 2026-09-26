import styled from 'styled-components';

export const OrderDataKey = styled.div`
    color: #706b67;
    flex: 0 0 160px;
    @media (max-width: 575px) {
        flex: none;
    }
`;

export const InfoWrapper = styled.div`
    display: flex;
    column-gap: 30px;
    margin-top: 0;
    padding: 14px 0;
    border-bottom: 1px solid #eceae7;
    @media (max-width: 575px) {
        flex-direction: column;
        gap: 5px;
    }

    span {
        font-weight: 700;
    }
`;
