import { FC, PropsWithChildren } from 'react';
import { ContentWrapper, LinkText, Wrapper } from './styles';
import Link from 'next/link';
import { Stack } from '@mui/material';
import { ADMIN_TABS } from '../../constants/admin';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { theme } from '../../constants/theme';

/**
 * Layout с возможностью возврата на страницу со списком товаров
 */
const AdminReturnToProductsLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Wrapper>
            <Link href={ADMIN_TABS[0].href}>
                <Stack direction="row" alignItems="center" display="inline-flex" gap={1} marginBottom={2}>
                    <ArrowBackIosNewRoundedIcon fontSize={'small'} htmlColor={theme.colors.primary} />
                    <LinkText>Назад к товарам</LinkText>
                </Stack>
            </Link>
            <ContentWrapper>{children}</ContentWrapper>
        </Wrapper>
    );
};

export default AdminReturnToProductsLayout;
