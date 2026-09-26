import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const FieldSkeleton = styled.div`
    flex: 1;
    line-height: 0;
`;

export const EditorialSkeleton = styled(Skeleton)`
    position: absolute;
    inset: 0;
`;
