import { Stack } from '@mui/system';
import Skeleton from 'react-loading-skeleton';
import { WrappedItem } from './styles';

const CartPageSkeleton = () => {
    return (
        <Stack justifyContent="space-between" direction={'row'}>
            <WrappedItem flex={'0 0 75%'}>
                <Stack direction="column" spacing={3}>
                    <Skeleton width={'100%'} height={150} />
                    <Skeleton width={'100%'} height={150} />
                    <Skeleton width={'100%'} height={150} />
                </Stack>
            </WrappedItem>
            <WrappedItem flex={'0 0 20%'}>
                <Skeleton width={'100%'} height={300} />
            </WrappedItem>
        </Stack>
    );
};

export default CartPageSkeleton;
