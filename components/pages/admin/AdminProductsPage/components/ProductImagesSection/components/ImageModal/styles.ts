import { Checkbox, Stack } from '@mui/material';
import styled from 'styled-components';
import { theme } from '../../../../../../../../constants/theme';

export const Wrapper = styled.div`
    width: 70vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.backgroundColors.primary};
    padding: 10px;
    border-radius: 5px;
    overflow: auto;
    max-height: 90vh;

    @media (max-width: 991px) {
        width: 95vw;
    }
`;

export const CloseIconWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
`;

export const ContentWrapper = styled.div`
    margin-top: 15px;
`;

export const ImageWrapper = styled.div<{ isNoImage: boolean }>`
    width: 100%;
    height: 300px;
    border: ${(p) => (p.isNoImage ? '1px dashed grey' : 'none')};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledCheckbox = styled(Checkbox)`
    color: ${(p) => p.theme.colors.primary} !important;
    svg {
        fill: ${(p) => p.theme.colors.primary} !important;
    }
`;

export const CheckboxLabel = styled.div`
    font-size: 20px;
`;

export const HiddenInput = styled.input`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1;
`;

export const ImageFormFields = styled(Stack)`
    && {
        gap: 16px;
    }
`;
