import styled from 'styled-components';

export const MainWrapper = styled.div`
    background: #fff1ef;
    border-bottom: 1px solid #f2d4d0;
    box-shadow: inset 4px 0 0 #da2519;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 10px 0 10px 12px;
`;

export const NewsText = styled.div`
    flex-grow: 1;
    color: #49382d;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.5;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;
