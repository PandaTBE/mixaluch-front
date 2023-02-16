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
                        <a href="tel:+79269376840">+7 (926) 937-68-40</a>
                    </Text>
                </li>
                <li>
                    <Text fontWeight={500}>
                        <a href="tel:+79264013393">+7 (926) 401-33-93</a>
                    </Text>
                </li>
                <li>
                    <Text fontWeight={500}>
                        <a href="tel:+79775703378">+7 (977) 570-33-78</a>
                    </Text>
                </li>
            </ul>

            <Text>Мы подберем для Вас как маринад, так и мясо, исходя из Ваших вкусовых предпочтений.</Text>
            <Text>Минимальная стоимость маринада - 200 рублей.</Text>
        </Wrapper>
    );
};

export default KebabPage;
