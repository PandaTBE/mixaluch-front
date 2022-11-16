import { Stack } from '@mui/material';
import { Title, Wrapper } from './styles';

/**
 * компонент для отображения приемуществ компании
 */
const Advantages = () => {
    return (
        <Wrapper>
            <Title>Наши приемущества</Title>
            <Stack direction={'row'} spacing={2}></Stack>
        </Wrapper>
    );
};

export default Advantages;
