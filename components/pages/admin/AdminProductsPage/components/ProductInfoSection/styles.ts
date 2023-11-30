import { Checkbox } from '@mui/material';
import styled from 'styled-components';

export const StyledCheckbox = styled(Checkbox)`
    color: ${(p) => p.theme.colors.primary} !important;
    svg {
        fill: ${(p) => p.theme.colors.primary} !important;
    }
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-top: 15px;
`;

export const StyledForm = styled.form`
    margin-top: 20px;
`;
