import { FC } from 'react';
import { MainWrapper, NewsText, Wrapper } from './styles';
import { IProps } from './interfaces';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Container from '../../../../../../components/Container/Container';

/**
 * Компонент для отображения одной новости
 */
const SingleImportantNews: FC<IProps> = ({ newsData, removeImportantNews }) => {
    const onRemove = () => {
        removeImportantNews(newsData.id);
    };

    return (
        <MainWrapper>
            <Container>
                <Wrapper>
                    <NewsText>{newsData.short_text}</NewsText>
                    <IconButton onClick={onRemove}>
                        <CloseIcon />
                    </IconButton>
                </Wrapper>
            </Container>
        </MainWrapper>
    );
};

export default SingleImportantNews;
