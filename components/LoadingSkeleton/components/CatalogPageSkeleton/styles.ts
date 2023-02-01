import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 25% 70%;
    gap: 20px;
    justify-content: space-between;
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export const MainCategory = styled.div`
    margin-top: 20px;
    width: 75%;
    @media (max-width: 767px) {
        width: 45%;
    }
`;

export const SubCategory = styled.div`
    margin-left: 30px;
    width: 75%;
    @media (max-width: 767px) {
        width: 45%;
    }
`;

export const SubCategoryWrapper = styled.div`
    margin-top: 10px;
`;
export const SkeletonPageWrapper = styled.div`
    padding: 20px 0;
`;
