import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { ItemWrapper, NavItemWrapper } from './styles';

/**
 * Компонент для отображения загрузки для страницы пользователя
 */
const UserAccountPageSkeleton = () => {
    return (
        <Stack width={'100%'} direction="row" spacing={5}>
            <ItemWrapper flex={'0 0 15%'}>
                <NavItemWrapper>
                    <Skeleton width={'100%'} />
                </NavItemWrapper>

                <NavItemWrapper>
                    <Skeleton width={'90%'} />
                </NavItemWrapper>

                <NavItemWrapper>
                    <Skeleton width={'85%'} />
                </NavItemWrapper>
            </ItemWrapper>
            <ItemWrapper flex={'0 0 80%'}>
                <Skeleton height={30} width={300} />
                <NavItemWrapper>
                    <Skeleton width={85} />
                </NavItemWrapper>
                <NavItemWrapper>
                    <Skeleton width={125} />
                </NavItemWrapper>
                <NavItemWrapper>
                    <Skeleton width={150} />
                </NavItemWrapper>
            </ItemWrapper>
        </Stack>
    );
};

export default UserAccountPageSkeleton;
