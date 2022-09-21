import { FC } from 'react';
import { IProps } from './interfaces';
import { StyledTitle } from './styles';

/**
 * Компонент для отображения тайтла страницы
 * @param text текст для отображения
 * @returns
 */
const PageTitle: FC<IProps> = ({ text }) => {
    return <StyledTitle>{text}</StyledTitle>;
};

export default PageTitle;
