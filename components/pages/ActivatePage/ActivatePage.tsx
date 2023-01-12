import { useRouter } from 'next/router';

/**
 * Компонент отображения страницы активации аккаунта после регистрации
 */
const ActivatePage = () => {
    const router = useRouter();
    const {
        query: { uid, token },
    } = router;

    return <div>123</div>;
};

export default ActivatePage;
