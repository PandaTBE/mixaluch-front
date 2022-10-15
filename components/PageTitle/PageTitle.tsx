import { FC } from 'react';
import { IProps } from './interfaces';
import { StyledTitle } from './styles';

/**
 * Компонент для отображения тайтла страницы
 * @param text текст для отображения
 * @returns
 */
const PageTitle: FC<IProps> = ({ children }) => {
    return <StyledTitle>{children}</StyledTitle>;
};

export default PageTitle;
