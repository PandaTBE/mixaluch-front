import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { ICategory } from '../../../../../../../models/Category';
import { CategoryImageWrapper, NameWrapper, Wrapper } from './styles';

interface IProps {
    /** Данные категории */
    category: ICategory;
}

/**
 * Компонент для отображения карточки с главной категорией
 */
const CategoryCard: FC<IProps> = ({ category }) => {
    return (
        <Link href={`/catalog?category=${category.id}`} passHref>
            <Wrapper>
                <CategoryImageWrapper>
                    <Image
                        objectFit={'cover'}
                        src={category.image}
                        alt=""
                        layout={'fill'}
                        sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 220px"
                    />
                </CategoryImageWrapper>
                <NameWrapper>{category.name}</NameWrapper>
            </Wrapper>
        </Link>
    );
};

export default CategoryCard;
