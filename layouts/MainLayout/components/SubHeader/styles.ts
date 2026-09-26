import { PersonOutlineOutlined } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import styled from 'styled-components';

export const Wrapper = styled.div`
    background: white;
    .header-row {
        min-height: 92px;
        display: flex;
        align-items: center;
        gap: 24px;
    }
    .pickup {
        display: flex;
        flex-direction: column;
        gap: 4px;
        white-space: nowrap;
        font-size: 13px;
    }
    .pickup span {
        color: ${(p) => p.theme.colors.grey};
        font-size: 11px;
    }
    .account {
        display: flex;
        align-items: center;
        min-height: 44px;
    }
    @media (max-width: 1000px) {
        .pickup {
            display: none;
        }
        .header-row {
            gap: 14px;
        }
    }
    @media (max-width: 767px) {
        .header-row {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 10px;
            padding: 12px 0;
        }
        .account {
            display: none;
        }
    }
`;

export const LogoWrapper = styled.a`
    width: 180px;
    height: 34px;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
    @media (max-width: 767px) {
        width: min(42vw, 170px);
        height: 30px;
    }
`;

export const SearchForm = styled.form`
    position: relative;
    background: #f6f5f3;
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 150px;
    flex: 1;
    height: 48px;
    padding: 0 12px;
    color: #706b67;
    box-shadow: 0 0 0 1px transparent;
    &:focus-within {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary};
    }
    .search-error {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 2;
        padding: 8px;
        border-radius: 8px;
        background: #fff1ef;
        color: #92291e;
        font-size: 12px;
    }
    label {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    button {
        border: 0;
        background: transparent;
        color: ${(p) => p.theme.colors.primary};
        font-weight: 700;
        cursor: pointer;
        min-height: 44px;
    }
    button:focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: 2px;
    }
    @media (max-width: 767px) {
        grid-column: 1 / -1;
        grid-row: 2;
        width: 100%;
    }
`;

export const SearchInput = styled.input`
    border: 0;
    background: transparent;
    &&:focus-visible {
        outline: none;
    }
    width: 100%;
    min-width: 0;
    font: inherit;
    font-size: 14px;
    &::-webkit-search-cancel-button {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        cursor: pointer;
        background-color: ${(p) => p.theme.colors.primary};
        -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='m4 4 8 8M12 4l-8 8' fill='none' stroke='black' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")
            center / contain no-repeat;
    }
`;

export const LoginIcon = styled(PersonOutlineOutlined)`
    color: ${(p) => p.theme.colors.primary};
    width: 28px !important;
    height: 28px !important;
`;

export const CartIcon = styled(ShoppingCartOutlinedIcon)`
    color: white;
    width: 23px !important;
    height: 23px !important;
`;

export const CartIconWrapper = styled.span`
    position: relative;
    display: inline-flex;
`;

export const TotalItems = styled.span`
    position: absolute;
    top: -9px;
    right: -10px;
    border-radius: 50%;
    background: white;
    color: ${(p) => p.theme.colors.primary};
    font-size: 11px;
    min-width: 19px;
    height: 19px;
    display: grid;
    place-items: center;
`;

export const TotalSum = styled.span`
    font-weight: 700;
    white-space: nowrap;
    @media (max-width: 767px) {
        display: none;
    }
`;

export const CartWrapper = styled.a`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    padding: 0 16px;
    background: ${(p) => p.theme.colors.primary};
    color: white;
    border-radius: 13px;
    font-size: 14px;
    &:hover {
        background: #bd1d13;
        color: white;
    }
    @media (max-width: 767px) {
        padding: 0 12px;
        min-height: 42px;
    }
`;

export const MenuIconWrapper = styled.div`
    display: none;
    color: ${(p) => p.theme.colors.primary};
    @media (max-width: 767px) {
        display: block;
    }
`;
