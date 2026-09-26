import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '../../../../Button/Button';
import { ButtonWrapper, ContentWrapper, Layout, SubTitle, Title, Wrapper } from './styles';

/**
 * Компонент для отображения секции с шашлыком
 */
const Kebab = () => {
    const router = useRouter();

    const onClick = () => {
        router.push('/kebab');
    };

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
                <Title>Замариновать мясо для шашлыка</Title>
                <SubTitle>
                    Вкусный шашлык. Индивидуальный выбор мяса, разнообразие маринада, индивидуальный подход!
                </SubTitle>
                <ButtonWrapper>
                    <Button clickHandler={onClick} width={'auto'}>
                        <div>Узнать подробнее</div>
                    </Button>
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Kebab;
