import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const Wrapper = styled.section`
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 40px;
    @media (max-width: 1000px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 450px) {
        gap: 9px;
        margin-bottom: 28px;
    }
`;

export const CategoryImageSkeleton = styled(Skeleton)`
    && {
        position: absolute;
        inset: 0;
    }
`;
