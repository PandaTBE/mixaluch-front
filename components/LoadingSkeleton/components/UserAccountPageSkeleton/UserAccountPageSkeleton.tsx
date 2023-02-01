import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { Navigation, Section, Wrapper } from './styles';

/**
 * Компонент для отображения загрузки для страницы пользователя
 */
const UserAccountPageSkeleton = () => {
    return (
        <Wrapper>
            <Navigation>
                <Stack spacing={2}>
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                    <Skeleton width={75} />
                </Stack>
            </Navigation>
            <Section>
                <Stack spacing={2}>
                    <Skeleton width={250} />
                    <Skeleton width={225} />
                    <Skeleton width={200} />
                </Stack>
            </Section>
        </Wrapper>
    );
};

export default UserAccountPageSkeleton;
