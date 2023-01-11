import { FC } from 'react';
import { Wrapper } from './styles';

interface IProps {
    /** Текст сообщения */
    text: string;
}

/**
 * Компонент для отображения успешного сообщения
 */
const SuccessMessage: FC<IProps> = ({ text }) => {
    return <Wrapper>{text}</Wrapper>;
};

export default SuccessMessage;
