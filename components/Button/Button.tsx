import { FC } from 'react';
import { IProps } from './interfaces';
import { Wrapper } from './styles';

/**
 * Компонент для отображения кнопки
 */
const Button: FC<IProps> = ({ clickHandler, children, width = '100%', disabled = false, ...props }) => {
    return (
        <Wrapper
            onClick={disabled ? undefined : clickHandler ? clickHandler : undefined}
            disabled={disabled}
            type={props.type}
            width={width}
        >
            {children}
        </Wrapper>
    );
};

export default Button;
