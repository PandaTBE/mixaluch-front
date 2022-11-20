import styled from 'styled-components';

export const Wrapper = styled.div`
    border: ${(p) => `1px solid ${p.theme.border.primary}`};
    border-radius: 10px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ImageWrapper = styled.div``;

export const ContentWrapper = styled.div`
    padding: 0px 10px 10px 10px;
    margin-top: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    display: inline-block;
    cursor: pointer;
    flex-grow: 1;
    :hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const Price = styled.div`
    margin-top: 10px;
    font-weight: 600;
    font-size: 28px;
`;

export const Image = styled.img<{ height?: string }>`
    width: 100%;
    height: ${(p) => p.height || 'auto'};
    cursor: pointer;
    object-fit: contain;
`;

export const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

export const ButtonContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.div`
    color: #ffff;
    margin-right: 5px;
`;
