import { Admin, Resource } from 'react-admin';
import ProductsList from './components/ProductsList/ProductsList';
import { urls } from '../../../constants/urls';
import jsonServerProvider from 'ra-data-json-server';

export const dataProvider = jsonServerProvider(urls.baseUrl);

const AdminPage = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="products/" list={ProductsList} />
        </Admin>
    );
};

export default AdminPage;
