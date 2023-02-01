import { Stack } from '@mui/material';
import Card from './components/Card/Card';
import { advantagesCardsContent } from './constants/constants';
import { CardsWrapper, Title, Wrapper } from './styles';

/**
 * компонент для отображения приемуществ компании
 */
const Advantages = () => {
    return (
        <Wrapper>
            <Title>Наши приемущества</Title>
            <CardsWrapper>
                <Stack
                    direction={'row'}
                    justifyContent={{ xs: 'center', sm: 'space-between' }}
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                >
                    {advantagesCardsContent.map((card) => {
                        return <Card key={card.id} card={card} />;
                    })}
                </Stack>
            </CardsWrapper>
        </Wrapper>
    );
};

export default Advantages;
