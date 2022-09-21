import { FC, useState } from 'react';
import { IProps } from './interfaces';
import { ChildText, ChildWrapper, ParentWrapper, Text, Wrapper } from './styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

const ListItem: FC<IProps> = ({ item }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <Wrapper>
            <ParentWrapper>
                <Text>{item.parent.name}</Text>
                {item.children.length ? (
                    open ? (
                        <ExpandLess onClick={toggleOpen} />
                    ) : (
                        <ExpandMore onClick={toggleOpen} />
                    )
                ) : null}
            </ParentWrapper>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.children.map((element) => (
                        <ChildWrapper key={element.id}>
                            <ChildText>{element.name}</ChildText>
                        </ChildWrapper>
                    ))}
                </List>
            </Collapse>
        </Wrapper>
    );
};

export default ListItem;
