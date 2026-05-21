import PageTitle from '../../PageTitle/PageTitle';
import { weekDays } from './constants/constants';
import { Wrapper, Text, ScheduleWrapper, ScheduleItem, ScheduleWeekDay } from './styles';

/**
 * Компонент для отображения страницы контактов
 */
const ContactsPage = () => {
    return (
        <Wrapper>
            <PageTitle text={'Контакты'} />
            <Text>Вы можете найти нас по адресу: г. Подольск, ул. Правды, дом 28</Text>
            <Text>
                Телефон для связи: <a href="tel:+79250001660">+7 (925) 000-16-60</a>
            </Text>
            <Text>
                По вопросам сотрудничества обращаться по телефону: <a href="tel:+79250001660">+7 (925) 000-16-60</a>
            </Text>
            <Text>Email: mixaluch-shop@yandex.ru</Text>
            <Text fontWeight={700}>График работы магазина:</Text>
            <ScheduleWrapper>
                {weekDays.map((element) => (
                    <ScheduleItem key={element.name}>
                        <ScheduleWeekDay>{element.name}</ScheduleWeekDay>
                        <div>{element.workingHours}</div>
                    </ScheduleItem>
                ))}
            </ScheduleWrapper>
            <Text>Заказы через сайт принимаются круглосуточно!</Text>
        </Wrapper>
    );
};

export default ContactsPage;
