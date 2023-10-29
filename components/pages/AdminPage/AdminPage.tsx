import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ADMIN_TABS } from '../../../constants/admin';

const AdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push(ADMIN_TABS[0].href);
    }, []);
    return <div>admin</div>;
};

export default AdminPage;
