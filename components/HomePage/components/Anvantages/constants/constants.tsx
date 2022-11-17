import { StyledInventoryOutlinedIcon, StyledThumbUpAltOutlinedIcon, StyledTVerifiedUserOutlinedIcon } from '../styles';

export interface ICard {
    id: number;
    title: string;
    text: string;
    Component: JSX.Element;
}

export const advantagesCardsContent: ICard[] = [
    {
        id: 1,
        title: 'Широкий ассортимент',
        Component: <StyledInventoryOutlinedIcon />,
        text: 'Мы закупаем нашу продукцию только у проверенных поставщиков. Более 200 видов мясной и рыбной продукции!',
    },
    {
        id: 2,
        title: 'Всегда свежее',
        Component: <StyledThumbUpAltOutlinedIcon />,
        text: 'Вся охлажденная продукция перевозится в машинах-рефрижераторах с разными режимами температуры.',
    },
    {
        id: 3,
        title: 'Контроль качества',
        Component: <StyledTVerifiedUserOutlinedIcon />,
        text: 'Мы контролируем качество – от поставщика до полки. Для хранения мы используем самое современное оборудование.',
    },
];
