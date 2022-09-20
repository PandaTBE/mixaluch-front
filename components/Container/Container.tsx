import { FC } from 'react';
import { IProps } from './interfaces';
import { Wrapper } from './styles';

/**
 * Компонент для обертывания всего контента
 * @param children элемент для отображения внутри контейнера
 */
const Container: FC<IProps> = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

export default Container;
