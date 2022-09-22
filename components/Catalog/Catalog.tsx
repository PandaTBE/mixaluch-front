import { Grid } from '@mui/material';
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { catalogState } from '../../slices/Catalog/catalog';
import { productState } from '../../slices/Product/product';
import PageTitle from '../PageTitle/PageTitle';
import ProductCard from '../ProductCard/ProductCard';
import ListItem from './components/ListItem/ListItem';
import usePrepareData from './hooks/usePrepareData';
import { ContentWrapper, Wrapper, ListSubHeader } from './styles';

const Catalog = () => {
    const { categoriesByParentId } = useSelector(catalogState);
    const { products } = useSelector(productState);
    usePrepareData();

    return (
        <Wrapper>
            <section>
                <PageTitle text={'Каталог'} />
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
                                    <ProductCard product={product} />
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
