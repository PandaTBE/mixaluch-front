import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ICategory } from '../../../../../../../models/Category';
import { TPageToSwitch } from '../../../../../../../slices/General/interfaces';
import { CategoryImageWrapper, NameWrapper, Wrapper } from './styles';

interface IProps {
    /** Данные категории */
    category: ICategory;
    /** Функция для записи выбранной категории */
    storeSelectedCategoryIdTrans: (id: number | null) => void;
    /** Функция для записи страницы, на которую происходит редирект */
    storePageToSwitchTrans: (page: TPageToSwitch) => void;
}

/**
 * Компонент для отображения карточки с главной категорией
 */
const CategoryCard: FC<IProps> = ({ category, storeSelectedCategoryIdTrans, storePageToSwitchTrans }) => {
    const router = useRouter();

    const onCardClick = () => {
        storeSelectedCategoryIdTrans(category.id);
        storePageToSwitchTrans('/catalog');
        router.push('/catalog');
    };

    return (
        <Wrapper onClick={onCardClick}>
            <CategoryImageWrapper>
                <Image objectFit={'cover'} src={category.image} alt={category.name} layout={'fill'} />
            </CategoryImageWrapper>
            <NameWrapper>{category.name}</NameWrapper>
        </Wrapper>
    );
};

export default CategoryCard;
