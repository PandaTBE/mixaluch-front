import { FC } from 'react';
import { IProps } from './interfaces';
import { Wrapper } from './styles';

/**
 * Компонент для отображения кнопки
 */
const Button: FC<IProps> = ({ clickHandler, children, width = '100%' }) => {
    return (
        <Wrapper width={width} onClick={clickHandler}>
            {children}
        </Wrapper>
    );
};

export default Button;
