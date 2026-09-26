import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const CategoryHeading = styled.div`
    padding: 12px 14px;
    min-height: 48px;
    margin-bottom: 8px;
`;

export const CategoryContent = styled.div`
    padding: 12px 14px;
    width: 100%;
`;

export const HeadingContent = styled.div`
    width: 100%;
`;

export const HeadingSkeleton = styled(Skeleton)`
    max-width: 350px;
`;
