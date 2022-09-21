import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { catalogState } from '../../slices/Catalog/catalog';
import PageTitle from '../PageTitle/PageTitle';
import ListItem from './components/ListItem/ListItem';
import usePrepareData from './hooks/usePrepareData';
import { ContentWrapper, Wrapper, ListSubHeader } from './styles';

const Catalog = () => {
    const { categoriesByParentId } = useSelector(catalogState);
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
                <main></main>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Catalog;
