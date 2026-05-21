import PageTitle from '../../PageTitle/PageTitle';
import { Wrapper, Text } from './styles';

/**
 * Компонент для отображения страны с подробной информацией о шашлыке
 */
const KebabPage = () => {
    return (
        <Wrapper>
            <PageTitle text={'Замариновать мясо для шашлыка на заказ'} />
            <Text>Для заказа маринованного мяса позвоните по одному из следующих телефонов:</Text>
            <ul>
                <li>
                    <Text fontWeight={500}>
                        <a href="tel:+79250001660">+7 (925) 000-16-60</a>
                    </Text>
                </li>
            </ul>

            <Text>Мы подберем для Вас как маринад, так и мясо, исходя из Ваших вкусовых предпочтений.</Text>
            <Text>Минимальная стоимость маринада - от 100 рублей.</Text>
        </Wrapper>
    );
};

export default KebabPage;
