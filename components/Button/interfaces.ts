export interface IProps {
    /**
     * То что рисовать внутри кнопки
     */
    children: JSX.Element;
    /**
     * Обработчик нажатия на кнопку
     */
    clickHandler: () => void;
    /**
     * Ширина кнопки.DEFAULT 100%
     */
    width?: string;
    /**
     * Флаг, отвечающий за отключение кнопки
     */
    disabled?: boolean;
}
