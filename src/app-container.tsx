import { App } from './app';
import { Layout } from '@/features/layout';
import { useAppSelector } from './common/hooks';
import { selectIsAuthenticated } from './features/auth/selectors';
import { Navigate, useLocation } from 'react-router-dom';

export const AppContainer = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const location = useLocation();

    return (
        <>
            {isAuthenticated ? (
                <Layout>
                    <App />
                </Layout>
            ) : (
                <Navigate to="/auth/signin" state={{ from: location }} replace />
            )}
        </>
    );
};
