import Link from 'next/link';
import Container from '../../../../components/Container/Container';
import { Logo, Wrapper } from './styles';

const SubHeader = () => {
    return (
        <Wrapper>
            <Container>
                <Link href={'/'}>
                    <Logo src={'/logo.png'} alt={'Mixaluch logo'} />
                </Link>
            </Container>
        </Wrapper>
    );
};

export default SubHeader;
