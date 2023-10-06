import { ChildWrapper } from './styles';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import OverflowMenu from '../OverflowMenu/OverflowMenu';

/**
 * Компонент для отслеживания пересечения детей с их родиетелм и сокрытия их
 */
const IntersectionObserverWrapper: FC<PropsWithChildren> = ({ children }) => {
    const [visibilityMap, setVisibilityMap] = useState<{ [targetid: string]: boolean }>({});
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: navRef.current,
            threshold: 1,
        });

        Array.from(navRef.current?.children || []).forEach((item) => {
            if ((item as HTMLElement).dataset.targetid) {
                observer.observe(item);
            }
        });
        return () => observer.disconnect();
    }, [children]);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const updatedEntries: { [targetid: string]: boolean } = {};
        entries.forEach((entry) => {
            if (entry.target instanceof HTMLElement) {
                const targetid = entry.target.dataset.targetid;
                if (targetid) {
                    if (entry.isIntersecting) {
                        updatedEntries[targetid] = true;
                    } else {
                        updatedEntries[targetid] = false;
                    }
                }
            }
        });

        setVisibilityMap((prev) => ({
            ...prev,
            ...updatedEntries,
        }));
    };

    return (
        <Stack direction={'row'} spacing={2} alignItems={'center'} ref={navRef}>
            {Array.isArray(children) &&
                children?.map((child) => {
                    return (
                        <ChildWrapper
                            {...child.props}
                            key={child.props['data-targetid']}
                            visible={!!visibilityMap[child.props['data-targetid']]}
                        >
                            {child}
                        </ChildWrapper>
                    );
                })}
            <OverflowMenu visibilityMap={visibilityMap}>{children}</OverflowMenu>
        </Stack>
    );
};

export default IntersectionObserverWrapper;
