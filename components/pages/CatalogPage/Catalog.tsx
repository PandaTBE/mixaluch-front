import { AllProducts, ContentWrapper, ListSubHeader, StyledInput, Wrapper } from './styles';

import { Grid } from '@mui/material';
import List from '@mui/material/List';
import CategoryItem from './components/CategoryItem/CategoryItem';
import PageTitle from '../../PageTitle/PageTitle';
import ProductCard from '../../ProductCard/ProductCard';
import { catalogReducerValues, storeSelectedCategoryId } from '../../../slices/Catalog/catalog';
import usePrepareData from './hooks/usePrepareData';
import { useDispatch, useSelector } from 'react-redux';
import { CatalogContext, ICatalogContext } from './context';
import { ChangeEvent, useState } from 'react';
import { isNull } from 'lodash';

/**
 * Компонент для отображения страницы с каталогом товаров
 */
const Catalog = () => {
    const [filter, setFilter] = useState('');
    const { categoriesByParentId, selectedCategoryId } = useSelector(catalogReducerValues);
    const { products } = usePrepareData(filter);
    const dispatch = useDispatch();

    const storeSelectedCategoryIdTrans = (id: number | null) => {
        dispatch(storeSelectedCategoryId(id));
    };

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const context: ICatalogContext = {
        selectedCategoryId,
        storeSelectedCategoryIdTrans,
    };

    return (
        <CatalogContext.Provider value={context}>
            <Wrapper>
                <section>
                    <PageTitle text={'Каталог'} />
                </section>
                <ContentWrapper>
                    <aside>
                        <StyledInput onChange={onFilterChange} value={filter} label={'Поиск'} />
                        <List component="nav" subheader={<ListSubHeader>Категории</ListSubHeader>}>
                            <AllProducts
                                onClick={() => storeSelectedCategoryIdTrans(null)}
                                isSelected={isNull(selectedCategoryId)}
                            >
                                Все товары
                            </AllProducts>
                            {categoriesByParentId &&
                                Object.values(categoriesByParentId).map((element) => (
                                    <CategoryItem key={element.parent.id} item={element} />
                                ))}
                        </List>
                    </aside>
                    <main>
                        {products.length ? (
                            <Grid container spacing={2}>
                                {products.map((product) => {
                                    return (
                                        <Grid key={product.id} item xs={12} sm={6} md={4} xl={3}>
                                            <ProductCard imageHeight={'220px'} product={product} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        ) : (
                            <div>
                                Мы пока не успели добавить продукты данной категории. Для оформления заказа вы можете
                                позвонить нам!
                            </div>
                        )}
                    </main>
                </ContentWrapper>
            </Wrapper>
        </CatalogContext.Provider>
    );
};

export default Catalog;
