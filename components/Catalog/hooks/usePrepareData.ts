import { categoryReducerValues } from './../../../slices/Category/category';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { storeCategoriesByParentId } from '../../../slices/Catalog/catalog';
import { ICategoriesByParentId } from '../../../slices/Catalog/interfaces';

const usePrepareData = () => {
    const { categories } = useSelector(categoryReducerValues);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories) {
            const result = categories.reduce((acc: ICategoriesByParentId, value) => {
                if (value.parent === null) {
                    const children = categories.filter((element) => element.parent === value.id);
                    acc[value.id] = {
                        parent: value,
                        children,
                    };
                }
                return acc;
            }, {});
            dispatch(storeCategoriesByParentId(result));
        }
    }, [categories]);
};

export default usePrepareData;
