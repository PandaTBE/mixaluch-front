import PageTitle from '../../../PageTitle/PageTitle';
import { Wrapper, WrapperItem } from './styles';
import Skeleton from 'react-loading-skeleton';
import { Stack } from '@mui/material';

/**
 * Компонент для отображения загрузки страницы оформления заказа
 */
const OrderingPageSkeleton = () => {
    return (
        <>
            <PageTitle>
                <div>Оформление заказа</div>
            </PageTitle>
            <Wrapper>
                <WrapperItem>
                    <Stack spacing={2}>
                        <Skeleton height={150} />
                        <Skeleton height={250} />
                        <Skeleton height={100} />
                        <Skeleton height={50} />
                    </Stack>
                </WrapperItem>
                <WrapperItem>
                    <Stack spacing={2}>
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                    </Stack>
                </WrapperItem>
            </Wrapper>
        </>
    );
};

export default OrderingPageSkeleton;
