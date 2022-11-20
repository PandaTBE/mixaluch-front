import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { storeSelectedCategoryId } from '../../../../slices/Catalog/catalog';
import { categoryReducerValues } from '../../../../slices/Category/category';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import CategoryCard from './components/CategoryCard/CategoryCard';
import { Wrapper } from './styles';

/**
 * Компонент для отображения основных категорий
 */
const MainCategories = () => {
    const { mainCategories } = useSelector(categoryReducerValues);
    const dispatch = useDispatch();

    const storePageToSwitchTrans = (page: TPageToSwitch) => {
        dispatch(storePageToSwitch(page));
    };

    const storeSelectedCategoryIdTrans = (id: number | null) => {
        dispatch(storeSelectedCategoryId(id));
    };

    return (
        <Wrapper>
            <Grid container spacing={2}>
                {mainCategories?.map((category) => {
                    return (
                        <Grid xs={6} item key={category.id}>
                            <CategoryCard
                                storeSelectedCategoryIdTrans={storeSelectedCategoryIdTrans}
                                storePageToSwitchTrans={storePageToSwitchTrans}
                                category={category}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Wrapper>
    );
};

export default MainCategories;
