import { IconButton, Menu, MenuItem } from '@mui/material';
import { FC, MouseEvent, PropsWithChildren, useMemo, useState } from 'react';
import { Wrapper } from './styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IProps {
    visibilityMap: { [targetid: string]: boolean };
}

/**
 * Компонент для отображения сокрытых элементов меню
 */
const OverflowMenu: FC<PropsWithChildren<IProps>> = ({ visibilityMap, children }) => {
    const [anchorEl, setAnchorEl] = useState<null | Element>(null);

    const handleClick = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const shouldShowMenu = useMemo(() => Object.values(visibilityMap).some((value) => !value), [visibilityMap]);
    if (!shouldShowMenu) return null;

    return (
        <Wrapper>
            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={anchorEl ? Boolean(anchorEl) : false}
                onClose={handleClose}
            >
                {Array.isArray(children) &&
                    children
                        ?.filter((child) => !visibilityMap[child.props['data-targetid']])
                        .map((child) => {
                            return (
                                <MenuItem key={child.props['data-targetid']} onClick={handleClose}>
                                    <div>{child}</div>
                                </MenuItem>
                            );
                        })}
            </Menu>
        </Wrapper>
    );
};

export default OverflowMenu;
