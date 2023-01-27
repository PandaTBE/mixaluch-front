import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 20px 0;
`;

export const Text = styled.p<{ fontWeight?: number }>`
    margin: 0;
    margin-top: 20px;
    font-weight: ${(p) => (p.fontWeight ? p.fontWeight : 'normal')};
`;

export const ScheduleWrapper = styled.div`
    margin-top: 20px;
`;

export const ScheduleItem = styled.div`
    display: flex;
    column-gap: 20;
    margin-top: 10px;
`;

export const ScheduleWeekDay = styled.div`
    flex: 0 0 130px;
`;
