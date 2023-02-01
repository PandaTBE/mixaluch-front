import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    padding-top: 15px;

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
