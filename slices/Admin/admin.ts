import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ADMIN_TABS } from '../../constants/admin';
import { IAdminTab, IState } from './interfaces';
import { AppState } from '../../store';

const initialState: IState = {
    selectedTab: ADMIN_TABS[0],
};

const admin = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        /**
         * Изменение таба
         */
        storeSelectedTab: (state, action: PayloadAction<IAdminTab>) => {
            state.selectedTab = action.payload;
        },
    },
});

export const { storeSelectedTab } = admin.actions;

export const adminReducerValues = (state: AppState) => state.admin;

export default admin.reducer;
