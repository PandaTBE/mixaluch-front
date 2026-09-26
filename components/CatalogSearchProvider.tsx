import { createContext, FormEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { useQueryStates, parseAsInteger, parseAsString } from 'nuqs';
import { useRouter } from 'next/router';
import { catalogHref } from './pages/CatalogPage/catalogNavigation';

const SearchContext = createContext<{
    value: string;
    change: (value: string) => void;
    submit: (event: FormEvent<HTMLFormElement>) => void;
    error: string;
} | null>(null);

export function CatalogSearchProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [query, setQuery] = useQueryStates(
        {
            search: parseAsString.withDefault(''),
            category: parseAsInteger,
            page: parseAsInteger.withDefault(1),
        },
        { shallow: false, scroll: false, history: 'replace' },
    );
    const [value, setValue] = useState(query.search);
    const [error, setError] = useState('');
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const version = useRef(0);
    const submittedVersion = useRef(0);
    const ownNavigation = useRef(false);
    const destination = useRef<string | null>(null);
    const focusId = useRef<string | null>(null);

    const cancelTimer = () => {
        if (timer.current !== null) clearTimeout(timer.current);
        timer.current = null;
    };

    useEffect(() => {
        // Медленный ответ не должен затирать символы, введённые после отправки запроса.
        if (!ownNavigation.current || version.current === submittedVersion.current) setValue(query.search);
    }, [query.search, router.asPath]);

    useEffect(() => {
        const isDestination = (url: string) => {
            const next = new URL(url, 'http://localhost');
            return (
                next.pathname === '/catalog' &&
                catalogHref(
                    Number(next.searchParams.get('category')) || null,
                    next.searchParams.get('search') || '',
                ) === destination.current
            );
        };
        const start = (url: string) => {
            const next = new URL(url, 'http://localhost');
            if (!isDestination(url)) {
                cancelTimer();
                ownNavigation.current = false;
                destination.current = null;
                focusId.current = null;
                setError('');
                setValue(next.searchParams.get('search') || '');
            }
        };
        const complete = (url: string) => {
            if (!isDestination(url)) return;
            if (focusId.current && document.activeElement === document.body) {
                document.getElementById(focusId.current)?.focus();
            }
            destination.current = null;
            focusId.current = null;
        };
        const failed = (cause: { cancelled?: boolean }, url: string) => {
            if (!cause.cancelled && isDestination(url)) setError('Не удалось выполнить поиск. Попробуйте ещё раз.');
        };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', complete);
        router.events.on('routeChangeError', failed);
        return () => {
            cancelTimer();
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', complete);
            router.events.off('routeChangeError', failed);
        };
    }, [router.events]);

    const search = (input: string) => {
        cancelTimer();
        const text = input.trim();
        setError('');
        submittedVersion.current = version.current;
        ownNavigation.current = true;
        focusId.current = document.activeElement?.id || null;
        if (router.pathname === '/catalog') {
            destination.current = catalogHref(query.category, text);
            void setQuery({ search: text || null, page: null }).catch(() => {
                setError('Не удалось выполнить поиск. Попробуйте ещё раз.');
            });
        } else {
            destination.current = catalogHref(null, text);
            void router.push(destination.current).catch((cause) => {
                if (!cause.cancelled) setError('Не удалось выполнить поиск. Попробуйте ещё раз.');
            });
        }
    };

    const change = (input: string) => {
        version.current += 1;
        setValue(input);
        cancelTimer();
        const text = input.trim();
        if (
            text.length >= 3 ||
            (text.length === 0 && (router.pathname === '/catalog' || destination.current !== null))
        ) {
            timer.current = setTimeout(() => search(input), 400);
        }
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        search(value);
    };

    return <SearchContext.Provider value={{ value, change, submit, error }}>{children}</SearchContext.Provider>;
}

export function useCatalogSearch() {
    const context = useContext(SearchContext);
    if (!context) throw new Error('useCatalogSearch requires CatalogSearchProvider');
    return context;
}
