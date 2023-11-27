export interface IState {
    selectedTab: IAdminTab;
}

export interface IAdminTab {
    id: string;
    href: string;
    text: string;
    disabled?: boolean;
}
