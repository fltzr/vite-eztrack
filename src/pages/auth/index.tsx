import { load } from '@/common/utils';
import { Navigate } from 'react-router-dom';

export const Auth = () => {
    const token = load('auth');

    if (!token) {
        console.log('No token, send to signin');
        return <Navigate to="/auth/signin" replace />;
    } else {
        console.log('Token found, send to app');

        return <Navigate to="/" replace />;
    }
};
