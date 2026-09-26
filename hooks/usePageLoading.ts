import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const usePageLoading = () => {
    const [pending, setPending] = useState<{ url: string; targetUrl: string | null } | null>(null);
    const router = useRouter();
    const currentPath = useRef(router.asPath);
    currentPath.current = router.asPath;

    useEffect(() => {
        const handleStart = (url: string, { shallow = false } = {}) => {
            if (shallow || url.split('#')[0] === currentPath.current.split('#')[0]) {
                setPending(null);
                return;
            }
            const samePage = url.split(/[?#]/)[0] === currentPath.current.split(/[?#]/)[0];
            setPending({ url, targetUrl: samePage ? null : url });
        };
        const handleComplete = (url: string) => {
            setPending((current) => (current?.url === url ? null : current));
        };
        const handleError = (_error: unknown, url: string) => handleComplete(url);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleError);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleError);
        };
    }, [router.events]);

    return { loading: pending !== null, targetUrl: pending?.targetUrl ?? null };
};

export default usePageLoading;
