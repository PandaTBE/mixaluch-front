import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryApi } from '../api/CategoryApi';
import { storeCategories } from '../slices/Category/category';

export default function useAdminCategories() {
    const dispatch = useDispatch();
    const [attempt, setAttempt] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError(false);
        CategoryApi.getCategories()
            .then((categories) => {
                if (active) dispatch(storeCategories(categories));
            })
            .catch(() => { if (active) setError(true); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [dispatch, attempt]);

    return { loading, error, retry: () => setAttempt((value) => value + 1) };
}
