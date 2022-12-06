import { FC } from 'react';
import { ICard } from '../../constants/constants';
import { Title, Text, Wrapper } from './styles';

interface IProps {
    /** Данные самой карточки */
    card: ICard;
}

/**
 * Компонент для отображения карточки с приемуществом
 */
const Card: FC<IProps> = ({ card }) => {
    return (
        <Wrapper>
            {card.Component}
            <Title>{card.title}</Title>
            <Text>{card.text}</Text>
        </Wrapper>
    );
};

export default Card;
