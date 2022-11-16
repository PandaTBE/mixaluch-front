import { FC } from 'react';
import { ICategory } from '../../../../../../models/Category';
import { CategoryImage, NameWrapper, Wrapper } from './styles';

interface IProps {
    category: ICategory;
}

const CategoryCard: FC<IProps> = ({ category }) => {
    return (
        <Wrapper>
            <CategoryImage src={category.image} />
            <NameWrapper>{category.name}</NameWrapper>
        </Wrapper>
    );
};

export default CategoryCard;
