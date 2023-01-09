import { FC } from 'react';
import { IProps } from './interfaces';
import { SpinnerWrapper, StyledCircularProgress, Wrapper } from './styles';

/**
 * Компонент для отображения кнопки
 */
const Button: FC<IProps> = ({
    clickHandler,
    children,
    width = '100%',
    loading = false,
    disabled = false,
    ...props
}) => {
    return (
        <Wrapper
            onClick={disabled || loading ? undefined : clickHandler ? clickHandler : undefined}
            disabled={disabled || loading}
            type={props.type}
            width={width}
        >
            {loading ? (
                <SpinnerWrapper>
                    <StyledCircularProgress color={'inherit'} />
                </SpinnerWrapper>
            ) : (
                children
            )}
        </Wrapper>
    );
};

export default Button;
