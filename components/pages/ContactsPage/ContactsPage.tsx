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
                <a href="tel:+79264013393">+7 (926) 401-33-93</a>, <a href="tel:+79775703378">+7 (977) 570-33-78</a>
            </Text>
            <Text>
                По вопросам сотрудничества обращаться по телефону: <a href="tel:+79775703378">+7 (977) 570-33-78</a>
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
            <Text>ИП Суров Никита Денисович</Text>
            <Text>ОГРНИП: 321508100253362</Text>
            <Text>ИНН: 503621383796</Text>
        </Wrapper>
    );
};

export default ContactsPage;
