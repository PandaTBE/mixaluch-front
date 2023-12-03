import { CSSProperties } from 'react';
import { theme } from './theme';

export const DEFAULT_MODAL_STYLES: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.backgroundColors.primary,
    padding: '10px',
    borderRadius: '5px',
    overflow: 'auto',
    maxHeight: '90vh',
};
