import { ContentWrapper, ListSubHeader, Wrapper } from './styles';

import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from './components/ListItem/ListItem';
import PageTitle from '../PageTitle/PageTitle';
import ProductCard from '../ProductCard/ProductCard';
import { catalogState } from '../../slices/Catalog/catalog';
import { productReducerValues } from '../../slices/Product/product';
import usePrepareData from './hooks/usePrepareData';
import { useSelector } from 'react-redux';

const Catalog = () => {
    const { categoriesByParentId } = useSelector(catalogState);
    const { products } = useSelector(productReducerValues);
    usePrepareData();

    return (
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
                                <ListItem key={element.parent.id} item={element} />
                            ))}
                    </List>
                </aside>
                <main>
                    <Grid container spacing={2}>
                        {products?.map((product) => {
                            return (
                                <Grid item xs={6}>
                                    <ProductCard imageHeight={'300px'} product={product} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </main>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Catalog;
