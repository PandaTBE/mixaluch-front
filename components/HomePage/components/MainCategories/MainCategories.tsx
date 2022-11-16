import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { categoryReducerValues } from '../../../../slices/Category/category';
import CategoryCard from './components/CategoryCard/CategoryCard';
import { Wrapper } from './styles';

/**
 * Компонент для отображения основных категорий
 */
const MainCategories = () => {
    const { mainCategories } = useSelector(categoryReducerValues);
    return (
        <Wrapper>
            <Grid container spacing={2}>
                {mainCategories?.map((category) => {
                    return (
                        <Grid xs={6} item key={category.id}>
                            <CategoryCard category={category} />
                        </Grid>
                    );
                })}
            </Grid>
        </Wrapper>
    );
};

export default MainCategories;
