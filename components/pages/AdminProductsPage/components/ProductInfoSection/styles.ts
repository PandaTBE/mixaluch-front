import { Checkbox } from '@mui/material';
import styled from 'styled-components';

export const StyledCheckbox = styled(Checkbox)`
    color: ${(p) => p.theme.colors.primary} !important;
    svg {
        fill: ${(p) => p.theme.colors.primary} !important;
    }
`;
