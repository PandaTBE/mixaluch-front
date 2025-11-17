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
                Телефоны для связи: <a href="tel:+79269376840">+7 (926) 937-68-40</a>,{' '}
                <a href="tel:+79264013393">+7 (926) 401-33-93</a>, <a href="tel:+79250001660">+7 (925) 000-16-60</a>
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
            <Text fontWeight={700}>Реквизиты:</Text>
            <Text>ИП Серебрянская Елена Олеговна</Text>
            <Text>ОГРНИП: 325508100001771</Text>
            <Text>ИНН: 503608103489</Text>
        </Wrapper>
    );
};

export default ContactsPage;
