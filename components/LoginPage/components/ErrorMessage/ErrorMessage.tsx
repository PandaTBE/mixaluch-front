import { FC } from 'react';
import { IProps } from './interfaces';
import { Wrapper } from './styles';

/**
 * Компонент для отображения ошибки
 */
const ErrorMessage: FC<IProps> = ({ text }) => {
    return <Wrapper>{text}</Wrapper>;
};

export default ErrorMessage;
