import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { Navigation, Section, Wrapper } from './styles';

/**
 * Компонент отображения страницы загрузки для истории заказов
 */
const OrdersPageSkeleton = () => {
    return (
        <Wrapper>
            <Navigation>
                <Stack spacing={2}>
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                    <Skeleton width={75} />
                </Stack>
            </Navigation>
            <Section>
                <Stack spacing={2}>
                    <Skeleton height={400} />
                </Stack>
            </Section>
        </Wrapper>
    );
};

export default OrdersPageSkeleton;
