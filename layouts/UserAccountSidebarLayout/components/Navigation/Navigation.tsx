import { FC } from 'react';
import { Aside, NavItem } from './styles';

interface IProps {
    onLogoutClick: () => void;
    onLinkClick: (link: '/user-account' | '/orders') => void;
}

/**
 * Компонент для отображения нафигации
 */
const Navigation: FC<IProps> = ({ onLogoutClick, onLinkClick }) => {
    const handleLinkClick = (link: '/user-account' | '/orders') => () => {
        onLinkClick(link);
    };

    return (
        <Aside>
            <nav>
                <NavItem onClick={handleLinkClick('/user-account')}>Контактные данные</NavItem>
                <NavItem onClick={handleLinkClick('/orders')}>История заказов</NavItem>
                <NavItem onClick={onLogoutClick}>Выход</NavItem>
            </nav>
        </Aside>
    );
};

export default Navigation;
