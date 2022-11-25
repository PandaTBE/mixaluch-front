import styled from 'styled-components';

const Button = styled.button`
    background-color: ${(p) => p.theme.colors.primary};
    border: none;
    color: white;
    flex: 0 0 40px;
    min-height: 40px;
    font-size: 16px;
    cursor: pointer;
    :hover {
        background-color: ${(p) => p.theme.colors.primarySmooth};
    }
`;

export const StyledInput = styled.input`
    background-color: ${(p) => p.theme.colors.primary};
    color: white;
    border: none;
    width: auto;
    font-size: 16px;
    border-radius: 0px;
    text-align: center;
    min-width: 10px;
    :focus {
        outline: none;
    }
`;

export const MinusButton = styled(Button)`
    border-radius: 5px 0px 0px 5px;
`;

export const PlusButton = styled(Button)`
    border-radius: 0px 5px 5px 0px;
`;
