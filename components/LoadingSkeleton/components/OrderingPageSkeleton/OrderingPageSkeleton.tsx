import {
    OrderItemRow,
    CheckboxContent,
    OrderItemDetails,
    SummaryRow,
    DeliveryAlert,
    SkeletonCheckboxWrapper,
    CheckboxPlaceholder,
    OrderHeading,
    ProductTitlePlaceholder,
    PricePlaceholder,
} from './styles';
import { SkeletonOverlay } from '../styles';
import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { cartReducerValues, DELIVERY_COST, FREE_DELIVERY_BORDER } from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';
import PageTitle from '../../../PageTitle/PageTitle';
import {
    AccordionWrapper,
    BackLink,
    OrderWrapper,
    Total,
    Wrapper,
    WrapperItem,
} from '../../../pages/OrderingPage/styles';
import {
    ButtonWrapper,
    CheckboxLabel,
    CheckboxSubLabel,
    DeliveryCost,
    Title,
} from '../../../pages/OrderingPage/components/Delivery/styles';
import {
    Wrapper as Summary,
    StyledDivider,
    SubtotalWrapper,
    Subtotal,
    SubtotalValue,
    TotalValue,
} from '../../../pages/OrderingPage/components/Order/styles';
import { OrderItemImageWrapper } from '../../../pages/OrderingPage/components/Order/components/OrderItem/styles';
import {
    Wrapper as UserInfoWrapper,
    Title as UserInfoTitle,
    UserData,
} from '../../../pages/OrderingPage/components/UserInfo/styles';

const OrderingPageSkeleton = () => {
    const { cartItems, totalSum } = useSelector(cartReducerValues);
    const { user } = useSelector(userReducerValues);

    return (
        <div aria-hidden="true">
            <BackLink as="div">← Вернуться в корзину</BackLink>
            <PageTitle text="Оформление заказа" />
            <DeliveryAlert variant="outlined" severity="error">
                В связи с высокой нагрузкой доставка временно отключена. Самовывоз по-прежнему доступен. Приносим
                извинения за неудобства.
            </DeliveryAlert>
            <Wrapper>
                <WrapperItem>
                    {user && (
                        <UserInfoWrapper>
                            <UserInfoTitle>
                                <Skeleton width="80%" />
                            </UserInfoTitle>
                            <UserData>
                                <Skeleton width="45%" />
                            </UserData>
                            <UserData>
                                <Skeleton width="65%" />
                            </UserData>
                        </UserInfoWrapper>
                    )}
                    <Stack spacing={2}>
                        <Title>Доставка</Title>
                        <SkeletonCheckboxWrapper>
                            <OrderItemRow direction="row" spacing={1}>
                                <CheckboxContent direction="row" spacing={1}>
                                    <CheckboxPlaceholder>
                                        <Skeleton circle height={24} containerClassName="skeleton-block" />
                                    </CheckboxPlaceholder>
                                    <CheckboxLabel>Самовывоз</CheckboxLabel>
                                </CheckboxContent>
                                <DeliveryCost>+ 0 ₽</DeliveryCost>
                            </OrderItemRow>
                        </SkeletonCheckboxWrapper>
                        <SkeletonCheckboxWrapper>
                            <OrderItemRow direction="row" spacing={1}>
                                <CheckboxContent direction="row" spacing={1}>
                                    <CheckboxPlaceholder>
                                        <Skeleton circle height={24} containerClassName="skeleton-block" />
                                    </CheckboxPlaceholder>
                                    <Stack>
                                        <CheckboxLabel>Курьером</CheckboxLabel>
                                        {totalSum > 0 && totalSum < FREE_DELIVERY_BORDER && (
                                            <CheckboxSubLabel>
                                                <span>До бесплатной доставки:</span>
                                                {FREE_DELIVERY_BORDER - Math.floor(totalSum)} ₽
                                            </CheckboxSubLabel>
                                        )}
                                    </Stack>
                                </CheckboxContent>
                                <DeliveryCost>+ {totalSum >= FREE_DELIVERY_BORDER ? 0 : DELIVERY_COST} ₽</DeliveryCost>
                            </OrderItemRow>
                        </SkeletonCheckboxWrapper>
                        <Skeleton height={102} borderRadius={11} containerClassName="skeleton-block" />
                        <Title>Получатель</Title>
                        <Skeleton height={56} borderRadius={11} containerClassName="skeleton-block" />
                        <Skeleton height={56} borderRadius={11} containerClassName="skeleton-block" />
                        <Title>Способ оплаты</Title>
                        {['Наличными при получении', 'Картой при получении'].map((label) => (
                            <SkeletonCheckboxWrapper key={label}>
                                <CheckboxContent direction="row" spacing={1}>
                                    <CheckboxPlaceholder>
                                        <Skeleton circle height={24} containerClassName="skeleton-block" />
                                    </CheckboxPlaceholder>
                                    <CheckboxLabel>{label}</CheckboxLabel>
                                </CheckboxContent>
                            </SkeletonCheckboxWrapper>
                        ))}
                        <ButtonWrapper>
                            <Skeleton height={48} borderRadius={12} containerClassName="skeleton-block" />
                        </ButtonWrapper>
                    </Stack>
                </WrapperItem>
                <WrapperItem>
                    <AccordionWrapper>
                        <OrderHeading direction="row">
                            <Total>Ваш заказ</Total>
                            <Skeleton width={80} height={30} />
                        </OrderHeading>
                    </AccordionWrapper>
                    <OrderWrapper>
                        <Summary>
                            <Stack spacing={2}>
                                {cartItems.map(({ product }) => (
                                    <OrderItemRow key={product.id} direction="row" spacing={2}>
                                        <OrderItemDetails direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                            <OrderItemImageWrapper>
                                                <Skeleton height="100%" />
                                            </OrderItemImageWrapper>
                                            <ProductTitlePlaceholder>
                                                {product.title}
                                                <SkeletonOverlay>
                                                    <Skeleton height="100%" />
                                                </SkeletonOverlay>
                                            </ProductTitlePlaceholder>
                                        </OrderItemDetails>
                                        <PricePlaceholder>
                                            <Skeleton width={80} height={24} />
                                        </PricePlaceholder>
                                    </OrderItemRow>
                                ))}
                            </Stack>
                            <StyledDivider />
                            {['Сумма по товарам:', 'Стоимость доставки:'].map((label) => (
                                <SubtotalWrapper key={label}>
                                    <SummaryRow direction="row" spacing={2}>
                                        <Subtotal>{label}</Subtotal>
                                        <SubtotalValue>
                                            <Skeleton width={70} />
                                        </SubtotalValue>
                                    </SummaryRow>
                                </SubtotalWrapper>
                            ))}
                            <StyledDivider />
                            <SummaryRow direction="row" spacing={2}>
                                <Total>Итого:</Total>
                                <TotalValue>
                                    <Skeleton width={85} />
                                </TotalValue>
                            </SummaryRow>
                        </Summary>
                    </OrderWrapper>
                </WrapperItem>
            </Wrapper>
        </div>
    );
};

export default OrderingPageSkeleton;
