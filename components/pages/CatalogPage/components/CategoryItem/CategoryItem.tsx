import { useEffect, useState } from 'react';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { ICategory } from '../../../../../models/Category';
import { ChildList, Row, Toggle, Wrapper } from './styles';

interface Props {
    category: ICategory;
    childrenByParent: Record<string, ICategory[]>;
    selectedId: number | null;
    search: string;
    hrefFor: (category: number | null, search: string) => string;
}

const CategoryItem = ({ category, childrenByParent, selectedId, search, hrefFor }: Props) => {
    const children = childrenByParent[String(category.id)] || [];
    const hasSelectedDescendant = (item: ICategory): boolean =>
        item.id === selectedId || (childrenByParent[String(item.id)] || []).some(hasSelectedDescendant);
    const [open, setOpen] = useState(category.id === selectedId || children.some(hasSelectedDescendant));

    useEffect(() => {
        if (category.id === selectedId || children.some(hasSelectedDescendant)) setOpen(true);
    }, [selectedId]);

    return (
        <Wrapper>
            <Row>
                <Link href={hrefFor(category.id, search)}>
                    <a aria-current={category.id === selectedId ? 'page' : undefined}>{category.name}</a>
                </Link>
                {children.length > 0 && (
                    <Toggle
                        type="button"
                        onClick={() => setOpen((value) => !value)}
                        aria-expanded={open}
                        aria-label={`${open ? 'Свернуть' : 'Развернуть'} подкатегории: ${category.name}`}
                    >
                        <ExpandMoreIcon aria-hidden="true" />
                    </Toggle>
                )}
            </Row>
            {children.length > 0 && open && (
                <ChildList>
                    {children.map((child) => (
                        <CategoryItem
                            key={child.id}
                            category={child}
                            childrenByParent={childrenByParent}
                            selectedId={selectedId}
                            search={search}
                            hrefFor={hrefFor}
                        />
                    ))}
                </ChildList>
            )}
        </Wrapper>
    );
};

export default CategoryItem;
