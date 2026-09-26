import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 760px;
    padding: 20px 0 48px;
    line-height: 1.6;
    a {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const Text = styled.p<{ fontWeight?: number }>`
    margin: 0;
    margin-top: 20px;
    font-weight: ${(p) => (p.fontWeight ? p.fontWeight : 'normal')};
`;

export const ScheduleWrapper = styled.div`
    margin-top: 20px;
    background: #f6f5f3;
    border-radius: 16px;
    padding: 16px 22px 22px;
`;

export const ScheduleItem = styled.div`
    display: flex;
    column-gap: 20px;
    margin-top: 10px;
`;

export const ScheduleWeekDay = styled.div`
    flex: 0 0 130px;
`;
