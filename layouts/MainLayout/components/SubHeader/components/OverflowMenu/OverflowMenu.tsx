import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import {
    BodyWrapper,
    Contacts,
    Delivery,
    HeaderWrapper,
    LogoWrapper,
    Nav,
    StyledDrawer,
    StyledLink,
    Telephone,
    Wrapper,
    CategorySection,
} from './styles';
import { navigationListItems } from '../../../constants/constants';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { cloneDeep } from 'lodash';
import { userReducerValues } from '../../../../../../slices/User/user';
import { CategoryApi } from '../../../../../../api/CategoryApi';
import type { ICategory } from '../../../../../../models/Category';
import CategoryItem from '../../../../../../components/pages/CatalogPage/components/CategoryItem/CategoryItem';
import { catalogHref, visibleCategoryTree } from '../../../../../../components/pages/CatalogPage/catalogNavigation';

interface IProps {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

/**
 * Компонент для отображения выезжающего меню
 */
const OverflowMenu: FC<IProps> = ({ isDrawerOpen, toggleDrawerOpen }) => {
    const store = useSelector(userReducerValues);
    const router = useRouter();
    const [categories, setCategories] = useState<ICategory[] | null>(null);
    const selectedId = typeof router.query.category === 'string' ? Number(router.query.category) : null;
    const byParent = visibleCategoryTree(categories || []);

    useEffect(() => {
        if (!isDrawerOpen || categories !== null) return;
        let active = true;
        CategoryApi.getCategories()
            .then((result) => {
                if (active) setCategories(result);
            })
            .catch(() => {
                if (active) setCategories([]);
            });
        return () => {
            active = false;
        };
    }, [isDrawerOpen, categories]);

    const _navigationItems = useMemo(() => {
        const result = cloneDeep(navigationListItems);

        if (store.user?.is_staff && store.authToken) {
            result.push({
                id: 'admin',
                href: '/admin',
                name: 'Панель администратора',
                isActive: (pathname, href) => pathname.includes(href),
            });
        }
        return result;
    }, [store.user, store.authToken]);

    return (
        <StyledDrawer
            open={isDrawerOpen}
            onClose={toggleDrawerOpen}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Wrapper>
                <HeaderWrapper>
                    <Link href={'/'}>
                        <LogoWrapper onClick={toggleDrawerOpen}>
                            <Image src={'/static/logo.png'} alt={'У Михалыча — главная'} layout={'fill'} />
                        </LogoWrapper>
                    </Link>
                    <IconButton color={'inherit'} onClick={toggleDrawerOpen} aria-label="Закрыть меню">
                        <ChevronLeftIcon />
                    </IconButton>
                </HeaderWrapper>
                <BodyWrapper>
                    <Nav>
                        {_navigationItems.map((element) => {
                            return (
                                <StyledLink
                                    key={element.id}
                                    onClick={toggleDrawerOpen}
                                    active={router.pathname === element.href}
                                >
                                    <Link href={element.href}>{element.name}</Link>
                                </StyledLink>
                            );
                        })}
                    </Nav>
                    <CategorySection
                        aria-label="Категории товаров"
                        onClick={(event) => {
                            if ((event.target as HTMLElement).closest('a')) toggleDrawerOpen();
                        }}
                    >
                        <h2>Категории</h2>
                        <ul>
                            {(byParent['0'] || []).map((item) => (
                                <CategoryItem
                                    key={item.id}
                                    category={item}
                                    childrenByParent={byParent}
                                    selectedId={selectedId}
                                    search=""
                                    hrefFor={catalogHref}
                                />
                            ))}
                        </ul>
                        {categories?.length === 0 && (
                            <Link href="/catalog">
                                <a>Открыть каталог</a>
                            </Link>
                        )}
                    </CategorySection>
                    <Contacts>
                        <Delivery>
                            <span>Самовывоз</span>
                            Подольск, ул. Правды, 28
                        </Delivery>
                        <Telephone href="tel:+79250001660">+7 (925) 000-16-60</Telephone>
                    </Contacts>
                </BodyWrapper>
            </Wrapper>
        </StyledDrawer>
    );
};

export default OverflowMenu;
