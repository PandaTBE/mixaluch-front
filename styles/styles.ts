import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
html,
body {
    padding: 0;
    margin: 0;
    font-family: 'Fira Sans', sans-serif;
    font-size: 16px;
    height: 100%;
    width: 100%;
}

a {
    color: inherit;
    text-decoration: none;
}

* {
    box-sizing: border-box;
}

.skeleton-block {
    display: block;
    line-height: 0;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
    html .react-loading-skeleton::after {
        animation: none;
    }
}

@media (prefers-color-scheme: dark) {
    body {
        color: #333333;
    }
}
`;
