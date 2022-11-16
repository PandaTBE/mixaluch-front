import styled from 'styled-components';

export const Wrapper = styled.div`
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

export const CategoryImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
`;

export const NameWrapper = styled.div`
    border: ${(p) => `1px solid ${p.theme.border.primary}`};
    padding: 15px;
    border-radius: 0 0 10px 10px;
    font-size: 1.5rem;
`;
