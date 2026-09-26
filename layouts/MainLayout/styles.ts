import styled from 'styled-components';

export const Wrapper = styled.div`
    --header-height: 142px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #fff;
    color: #302d2b;
    > header {
        position: sticky;
        top: 0;
        z-index: 1100;
        background: #fff;
        box-shadow: 0 4px 16px rgb(48 45 43 / 6%);
    }
    & :where(main, a, button, input, select, textarea, [tabindex]) {
        scroll-margin-top: calc(var(--header-height) + 16px);
    }
    @media (max-width: 767px) {
        --header-height: 174px;
    }
    .skip-link {
        position: fixed;
        top: -100px;
        left: 16px;
        z-index: 2000;
        padding: 12px;
        background: white;
    }
    .skip-link:focus {
        top: 16px;
    }
    :where(a, button):focus-visible {
        outline: 2px solid #80554a;
        outline-offset: 2px;
    }
`;

export const ContentWrapper = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 28px 0 64px;
`;

export const LoadingStatus = styled.div`
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1200;
    padding: 10px 16px;
    border: 1px solid #e5ded8;
    border-radius: 10px;
    background: #fff;
    color: #49382d;
    box-shadow: 0 4px 16px rgb(48 45 43 / 10%);
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
`;

export const BackToTopButton = styled.button`
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 1200;
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: ${(p) => p.theme.colors.primary};
    color: #fff;
    box-shadow: 0 4px 16px rgb(48 45 43 / 20%);
    cursor: pointer;
    transition: background-color 160ms ease, transform 160ms ease;
    &:hover {
        background: ${(p) => p.theme.colors.primarySmooth};
        transform: translateY(-2px);
    }
    svg {
        font-size: 26px;
    }
    @media (max-width: 600px) {
        bottom: 16px;
        left: 16px;
        width: 44px;
        height: 44px;
    }
    @media (prefers-reduced-motion: reduce) {
        transition: none;
        &:hover {
            transform: none;
        }
    }
`;
