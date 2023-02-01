import { Skeleton } from '@mui/material';
import PageTitle from '../../../PageTitle/PageTitle';
import { Wrapper, WrapperItem } from './styles';

/**
 * Компонент для отображения загрузки страницы оформления заказа
 */
const OrderingPageSkeleton = () => {
    return (
        <Wrapper>
            <WrapperItem>
                <PageTitle>
                    <div>Оформление закака</div>
                </PageTitle>
                <Skeleton height={300} />
            </WrapperItem>
            <WrapperItem></WrapperItem>
        </Wrapper>
    );
};

export default OrderingPageSkeleton;
