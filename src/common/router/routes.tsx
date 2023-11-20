import type { RouteObject } from 'react-router-dom';
import { AppContainer } from '@/app-container';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <AppContainer />,
		children: [
			{
				index: true,
				lazy: () => import('@/pages/home'),
			},
			{
				path: 'demos',
				handle: {
					title: () => 'Demos',
				},
				children: [
					{
						path: 'single-page-form',
						lazy: () => import('@/pages/demos/single-page-form'),
					},
					{
						path: 'wizard',
						lazy: () => import('@/pages/demos/wizard'),
					},
				],
			},
			{
				path: 'todos',
				handle: {
					title: () => 'Todos',
				},
				lazy: () => import('@/pages/todos'),
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
			{
				path: 'verify',
				lazy: () => import('@/pages/auth/verify-email'),
			},
		],
	},
];
