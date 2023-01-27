export interface IState {
    pageToSwitch: TPageToSwitch;
}

export type TPageToSwitch = '/' | '/catalog' | '/cart' | '/user-account' | '/about';
