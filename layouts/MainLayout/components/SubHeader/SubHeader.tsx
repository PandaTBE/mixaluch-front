import Container from '../../../../components/Container/Container';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { cartReducerValues } from '../../../../slices/Cart/cart';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';
import { useState } from 'react';
import {
    CartIcon,
    CartIconWrapper,
    CartWrapper,
    LoginIcon,
    LogoWrapper,
    MenuIconWrapper,
    SearchForm,
    SearchInput,
    TotalItems,
    Wrapper,
} from './styles';
import Image from 'next/image';
import { useCatalogSearch } from '../../../../components/CatalogSearchProvider';
import OverflowMenu from './components/OverflowMenu/OverflowMenu';

const SubHeader = () => {
    const { authToken } = useSelector(userReducerValues);
    const { cartItems } = useSelector(cartReducerValues);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const search = useCatalogSearch();

    return (
        <Wrapper>
            <Container>
                <div className="header-row">
                    <MenuIconWrapper>
                        <IconButton aria-label="Открыть меню" color="inherit" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </MenuIconWrapper>
                    <Link href="/">
                        <LogoWrapper>
                            <Image
                                src="/static/logo.png"
                                alt="У Михалыча — главная"
                                priority
                                layout="fill"
                                objectFit="contain"
                            />
                        </LogoWrapper>
                    </Link>
                    <Link href="/delivery">
                        <a className="pickup">
                            <b>Самовывоз</b>
                            <span>Подольск, ул. Правды, 28</span>
                        </a>
                    </Link>
                    <SearchForm role="search" action="/catalog" method="get" onSubmit={search.submit}>
                        <label htmlFor="header-search">Поиск по товарам</label>
                        <SearchIcon aria-hidden="true" />
                        <SearchInput
                            id="header-search"
                            type="search"
                            name="search"
                            placeholder="Найти что-нибудь вкусное"
                            value={search.value}
                            onChange={(event) => search.change(event.target.value)}
                            maxLength={100}
                            aria-describedby={search.error ? 'header-search-error' : undefined}
                        />
                        <button type="submit" aria-label="Найти товары">
                            Найти
                        </button>
                        {search.error && (
                            <span id="header-search-error" className="search-error" role="alert">
                                {search.error}
                            </span>
                        )}
                    </SearchForm>
                    <Link href={authToken ? '/user-account' : '/login'}>
                        <a className="account" aria-label="Личный кабинет">
                            <LoginIcon />
                        </a>
                    </Link>
                    <Link href="/cart">
                        <CartWrapper>
                            <CartIconWrapper>
                                <CartIcon />
                                {cartItems.length > 0 && <TotalItems>{cartItems.length}</TotalItems>}
                            </CartIconWrapper>
                        </CartWrapper>
                    </Link>
                </div>
            </Container>
            <OverflowMenu isDrawerOpen={isDrawerOpen} toggleDrawerOpen={() => setDrawerOpen((open) => !open)} />
        </Wrapper>
    );
};

export default SubHeader;
