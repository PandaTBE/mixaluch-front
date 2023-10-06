import { List, Datagrid, TextField, EmailField } from 'react-admin';

const ProductsList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="category" />
                <EmailField source="unit" />
                <TextField source="description" />
                <TextField source="min_quantity" />
                <TextField source="number" />
            </Datagrid>
        </List>
    );
};

export default ProductsList;
