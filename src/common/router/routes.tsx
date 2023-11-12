import { RouteObject } from 'react-router-dom';
import { AppContainer } from '@/app-container';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppContainer />,
        children: [
            {
                path: 'demos',
                lazy: () => import('@/pages/demos'),
            },
        ],
    },
    {
        path: 'auth',
        children: [
            {
                path: 'signin',
                lazy: () => import('@/pages/auth/sign-in'),
            },
            {
                path: 'signup',
                lazy: () => import('@/pages/auth/sign-up'),
            },
        ],
    },
];
