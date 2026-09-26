import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { categoryReducerValues } from '../../../../../slices/Category/category';
import CategoryCard from './components/CategoryCard/CategoryCard';
import { CategoryImageWrapper, NameWrapper, Wrapper as CardWrapper } from './components/CategoryCard/styles';
import { CategoryImageSkeleton, Wrapper } from './styles';

interface IProps {
    isSkeleton?: boolean;
}

const MainCategories: FC<IProps> = ({ isSkeleton = false }) => {
    const { mainCategories } = useSelector(categoryReducerValues);
    const activeCategories = mainCategories?.filter((category) => category.is_active !== false);

    return (
        <Wrapper aria-label="Категории продуктов">
            {isSkeleton
                ? Array.from({ length: activeCategories?.length ?? 6 }, (_, index) => (
                      <CardWrapper as="div" key={index} aria-hidden="true">
                          <CategoryImageWrapper>
                              <CategoryImageSkeleton height="100%" borderRadius={0} />
                          </CategoryImageWrapper>
                          <NameWrapper>{activeCategories?.[index].name || <Skeleton width="70%" />}</NameWrapper>
                      </CardWrapper>
                  ))
                : activeCategories?.map((category) => <CategoryCard category={category} key={category.id} />)}
        </Wrapper>
    );
};

export default MainCategories;
