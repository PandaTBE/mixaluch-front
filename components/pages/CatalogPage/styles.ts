import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px 0;
`;

export const ContentWrapper = styled.div`
    display: grid;
    margin-top: 20px;
    grid-template-columns: 25% 70%;
    gap: 20px;
    justify-content: space-between;

    @media (max-width: 767px) {
        grid-template-columns: 1fr;
    }
`;

export const ListSubHeader = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 8px;
    margin-top: 15px;
`;

export const StyledInput = styled(TextField)`
    width: 100%;
`;
