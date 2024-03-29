import { FC, useContext, useState } from 'react';

import { ChildWrapper, ParentWrapper, Text, Wrapper } from './styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { ICategory } from '../../../../../models/Category';
import { CatalogContext } from '../../context';

export interface IProps {
    /** Основная категория с подкатегориями */
    item: { parent: ICategory; children: ICategory[] };
}

/**
 * Отображение категории
 */
const CategoryItem: FC<IProps> = ({ item }) => {
    const context = useContext(CatalogContext);
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prevState) => !prevState);
    };

    const onCategorySelect = (id: number) => () => {
        if (context) {
            context.storeSelectedCategoryIdTrans(id);
        }
    };

    return (
        <Wrapper>
            <ParentWrapper onClick={toggleOpen}>
                <Text
                    isSelected={context?.selectedCategoryId === item.parent.id}
                    onClick={onCategorySelect(item.parent.id)}
                >
                    {item.parent.name}
                </Text>
                {item.children.length ? open ? <ExpandLess /> : <ExpandMore /> : null}
            </ParentWrapper>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.children.map((element) => (
                        <ChildWrapper key={element.id}>
                            <Text
                                isChild={true}
                                isSelected={context?.selectedCategoryId === element.id}
                                onClick={onCategorySelect(element.id)}
                            >
                                {element.name}
                            </Text>
                        </ChildWrapper>
                    ))}
                </List>
            </Collapse>
        </Wrapper>
    );
};

export default CategoryItem;
