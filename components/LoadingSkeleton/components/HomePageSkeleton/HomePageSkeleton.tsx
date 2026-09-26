import { TextSkeleton } from '../styles';
import { EditorialSkeleton, FieldSkeleton } from './styles';
import { Stack } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Skeleton from 'react-loading-skeleton';
import MainCategories from '../../../pages/HomePage/components/MainCategories/MainCategories';
import PopularProducts from '../../../pages/HomePage/components/PopularProducts/PopularProducts';
import {
    Editorial,
    EditorialCopy,
    EditorialImage,
    Intro,
    NavigationLink,
    PageHeading,
    StoreNote,
} from '../../../pages/HomePage/styles';
import {
    ButtonWrapper,
    ContentWrapper,
    Form,
    FormWrapper,
    SubmitButton,
    TextWrapper,
    Title,
    Wrapper as FeedbackWrapper,
} from '../../../pages/HomePage/components/Feedback/styles';

const HomePageSkeleton = () => (
    <div aria-label="Загрузка главной страницы" aria-busy="true">
        <div aria-hidden="true">
            <Intro>
                <PageHeading>
                    <TextSkeleton>Мясо, рыба и другие продукты</TextSkeleton>
                </PageHeading>
                <NavigationLink as="span">
                    Весь каталог <ArrowForwardRoundedIcon />
                </NavigationLink>
            </Intro>
            <MainCategories isSkeleton />
            <PopularProducts isSkeleton />
            <Editorial>
                <EditorialCopy>
                    <span>
                        <TextSkeleton>Для встреч за одним столом</TextSkeleton>
                    </span>
                    <h2>
                        <TextSkeleton>
                            Вы выбираете мясо.
                            <br />
                            Маринад — за нами.
                        </TextSkeleton>
                    </h2>
                    <p>
                        <TextSkeleton>
                            Подготовим шашлык к вашему выезду: любимое мясо, подходящий маринад и ничего лишнего.
                        </TextSkeleton>
                    </p>
                    <a>
                        <TextSkeleton>Выбрать шашлык</TextSkeleton> <ArrowForwardRoundedIcon />
                    </a>
                </EditorialCopy>
                <EditorialImage>
                    <EditorialSkeleton height="100%" borderRadius={0} />
                </EditorialImage>
            </Editorial>
            <StoreNote>
                <p>
                    <strong>
                        <TextSkeleton>Доставляем по Подольску.</TextSkeleton>
                    </strong>{' '}
                    <TextSkeleton>Ждём в магазине на Правды, 28.</TextSkeleton>
                </p>
                <NavigationLink as="span">
                    О доставке <ArrowForwardRoundedIcon />
                </NavigationLink>
                <NavigationLink as="span">
                    Как нас найти <ArrowForwardRoundedIcon />
                </NavigationLink>
            </StoreNote>
            <FeedbackWrapper>
                <ContentWrapper>
                    <div>
                        <Title>
                            <TextSkeleton>Напишите Михалычу</TextSkeleton>
                        </Title>
                        <p>
                            <TextSkeleton>
                                Спросите о продуктах и заказах или поделитесь впечатлением о покупке.
                            </TextSkeleton>
                        </p>
                        <p id="feedback-reply-hint">
                            <TextSkeleton>Ответим на указанную почту.</TextSkeleton>
                        </p>
                    </div>
                    <FormWrapper>
                        <Form as="div">
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <FieldSkeleton>
                                    <Skeleton height={56} borderRadius={10} />
                                </FieldSkeleton>
                                <FieldSkeleton>
                                    <Skeleton height={56} borderRadius={10} />
                                </FieldSkeleton>
                            </Stack>
                            <TextWrapper>
                                <FieldSkeleton>
                                    <Skeleton height={125} borderRadius={10} />
                                </FieldSkeleton>
                            </TextWrapper>
                            <ButtonWrapper>
                                <SubmitButton disabled>
                                    <TextSkeleton>Отправить сообщение</TextSkeleton>
                                </SubmitButton>
                            </ButtonWrapper>
                        </Form>
                    </FormWrapper>
                </ContentWrapper>
            </FeedbackWrapper>
        </div>
    </div>
);

export default HomePageSkeleton;
