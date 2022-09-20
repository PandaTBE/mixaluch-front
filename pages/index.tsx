import type { NextPage } from 'next';
import styled from 'styled-components';

const Title = styled.h1`
    color: ${(p) => p.theme.colors.black};
`;

const Home: NextPage = () => {
    return <Title>123</Title>;
};

export default Home;
