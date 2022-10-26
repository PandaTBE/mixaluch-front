import { FC } from 'react';
import { IProps } from './interfaces';
import { Wrapper } from './styles';

/**
 * Компонент для отображения кнопки
 */
const Button: FC<IProps> = ({ clickHandler, children, width = '100%', disabled = false }) => {
    return (
        <Wrapper disabled={disabled} width={width} onClick={disabled ? undefined : clickHandler}>
            {children}
        </Wrapper>
    );
};

export default Button;
