import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    padding-top: 15px;
    justify-content: space-between;
    flex-grow: 1;
    @media (max-width: 767px) {
        flex-wrap: wrap;
    }
`;

export const WrapperItem = styled.div`
    flex: 0 0 50%;
    :first-child {
        padding-right: 15px;
        padding-bottom: 15px;
        border-right: ${(p) => `1px solid ${p.theme.border.primary}`};
    }

    :last-child {
        padding-left: 15px;
        padding-bottom: 15px;
    }

    @media (max-width: 767px) {
        flex: 0 0 100%;
        :first-child {
            padding-right: 0px;
            border-right: none;
        }

        :last-child {
            order: -1;
            padding-left: 0px;
        }
    }
`;

export const AccordionWrapper = styled.div`
    display: none;
    @media (max-width: 767px) {
        display: block;
    }
`;

export const OrderWrapper = styled.div`
    display: block;
    @media (max-width: 767px) {
        display: none;
    }
`;

export const Total = styled.div`
    font-size: 20px;
`;

export const TotalValue = styled.div`
    font-size: 25px;
    font-weight: 700;
    margin-right: 10px;
`;

export const ErrorWrapper = styled.div`
    margin-top: 20px;
    width: 50%;

    @media (max-width: 991px) {
        width: 75%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`;
