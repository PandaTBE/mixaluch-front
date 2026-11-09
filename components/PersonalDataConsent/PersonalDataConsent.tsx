import { ChangeEvent, FocusEvent, useId, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Link,
} from '@mui/material';
import PrivacyPolicy from './PrivacyPolicy';

interface PersonalDataConsentProps {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: FocusEvent<HTMLInputElement>) => void;
    error?: string;
}

const PersonalDataConsent = ({ checked, onChange, onBlur, error }: PersonalDataConsentProps) => {
    const id = useId();
    const [open, setOpen] = useState(false);

    return (
        <FormControl error={Boolean(error)} sx={{ my: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                <Checkbox
                    id={`${id}-checkbox`}
                    name="personalDataConsent"
                    checked={checked}
                    onChange={onChange}
                    required
                    sx={{ p: 1, mt: -0.75, ml: -1 }}
                    inputProps={{
                        onBlur,
                        'aria-labelledby': `${id}-label`,
                        'aria-describedby': error ? `${id}-error` : undefined,
                        'aria-invalid': Boolean(error),
                    }}
                />
                <Box id={`${id}-label`} sx={{ fontSize: '14px', lineHeight: 1.6, minWidth: 0 }}>
                    <label htmlFor={`${id}-checkbox`}>
                        Я даю согласие на обработку персональных данных и ознакомлен(а) с{' '}
                    </label>
                    <Link
                        component="button"
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-haspopup="dialog"
                        sx={{ font: 'inherit', textAlign: 'left', verticalAlign: 'baseline' }}
                    >
                        политикой обработки персональных данных
                    </Link>
                    .
                </Box>
            </Box>
            {error && <FormHelperText id={`${id}-error`} role="alert">{error}</FormHelperText>}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby={`${id}-title`}
                fullWidth
                maxWidth="md"
                scroll="paper"
            >
                <DialogTitle id={`${id}-title`}>Политика обработки персональных данных</DialogTitle>
                <DialogContent dividers tabIndex={0} sx={{ overflowWrap: 'anywhere' }}>
                    <PrivacyPolicy />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    );
};

export default PersonalDataConsent;
