import { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../slices/User/user';

const StaffOnlyPage: FC<PropsWithChildren> = ({ children }) => {
    const { user, authToken } = useSelector(userReducerValues);

    if (!user?.is_staff || !authToken) {
        return <>У Вас нет прав для просмотра этой страницы.</>;
    }

    return <>{children}</>;
};

export default StaffOnlyPage;
