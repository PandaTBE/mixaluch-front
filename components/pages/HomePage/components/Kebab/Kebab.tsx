import Image from 'next/image';
import Button from '../../../../Button/Button';
import { ButtonWrapper, ContentWrapper, Layout, SubTitle, Title, Wrapper } from './styles';

/**
 * Компонент для отображения секции с шашлыком
 */
const Kebab = () => {
    return (
        <Wrapper>
            <ContentWrapper>
                <Image
                    priority={true}
                    objectFit={'cover'}
                    src={'/static/kebab/kebab.jpeg'}
                    alt={'kebab'}
                    layout={'fill'}
                />
                <Layout />
                <Title>Шашлык на заказ</Title>
                <SubTitle>
                    Вкусный шашлык. Индивидуальный выбор мяса, разнообразие маринада, индивидуальный подход!
                </SubTitle>
                <ButtonWrapper>
                    <Button width={'auto'}>
                        <div>Узнать подробнее</div>
                    </Button>
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Kebab;
