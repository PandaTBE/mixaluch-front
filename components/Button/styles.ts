import styled from 'styled-components';

export const Wrapper = styled.button<{ width: string; disabled: boolean }>`
    display: block;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${(p) => p.theme.colors.primary};
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    padding: 5px 10px;
    width: ${(p) => p.width};
    border: 0;
    :hover {
        cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
        background-color: ${(p) => p.theme.colors.primarySmooth};
    }
    min-height: 40px;
    font-size: 16px;
    font-family: ${(p) => p.theme.fontFamily.default};
`;
