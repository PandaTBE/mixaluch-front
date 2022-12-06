import { ContentWrapper, ListSubHeader, Wrapper } from './styles';

import { Grid } from '@mui/material';
import List from '@mui/material/List';
import CategoryItem from './components/CategoryItem/CategoryItem';
import PageTitle from '../../PageTitle/PageTitle';
import ProductCard from '../../ProductCard/ProductCard';
import { catalogReducerValues, storeSelectedCategoryId } from '../../../slices/Catalog/catalog';
import usePrepareData from './hooks/usePrepareData';
import { useDispatch, useSelector } from 'react-redux';
import { CatalogContext, ICatalogContext } from './context';

/**
 * Компонент для отображения страницы с каталогом товаров
 */
const Catalog = () => {
    const { categoriesByParentId, selectedCategoryId } = useSelector(catalogReducerValues);
    const { filteredProducts } = usePrepareData();
    const dispatch = useDispatch();

    const storeSelectedCategoryIdTrans = (id: number | null) => {
        dispatch(storeSelectedCategoryId(id));
    };

    const context: ICatalogContext = {
        selectedCategoryId,
        storeSelectedCategoryIdTrans,
    };

    return (
        <CatalogContext.Provider value={context}>
            <Wrapper>
                <section>
                    <PageTitle>
                        <div>Каталог</div>
                    </PageTitle>
                </section>
                <ContentWrapper>
                    <aside>
                        <List component="nav" subheader={<ListSubHeader>Фильтры</ListSubHeader>}>
                            {categoriesByParentId &&
                                Object.values(categoriesByParentId).map((element) => (
                                    <CategoryItem key={element.parent.id} item={element} />
                                ))}
                        </List>
                    </aside>
                    <main>
                        {filteredProducts.length ? (
                            <Grid container spacing={2}>
                                {filteredProducts.map((product) => {
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
