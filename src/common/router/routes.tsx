import type { RouteObject } from 'react-router-dom';
import { AppContainer } from '@/app-container';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <AppContainer />,
		children: [
			{
				index: true,
				lazy: () => import('@/features/home/pages'),
			},
			{
				path: 'demos',
				handle: {
					title: () => 'Demos',
				},
				children: [
					{
						path: 'single-page-form',
						lazy: () => import('@/features/demos/pages/single-page-form'),
					},
					{
						path: 'wizard',
						lazy: () => import('@/features/demos/pages/wizard'),
					},
				],
			},
			{
				path: 'todos',
				handle: {
					title: () => 'Todos',
				},
				lazy: () => import('@/features/todos/pages'),
			},
		],
	},
	{
		path: 'auth',
		children: [
			{
				path: 'signin',
				lazy: () => import('@/features/auth/pages/sign-in'),
			},
			{
				path: 'signup',
				lazy: () => import('@/features/auth/pages/sign-up'),
			},
			{
				path: 'verify',
				lazy: () => import('@/features/auth/pages/verify-email'),
			},
		],
	},
];
