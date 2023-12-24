import type { RouteObject } from 'react-router-dom';
import { AppContainer } from '@/app-container';
import { ErrorComponent } from '@/common/layouts/error-component';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <AppContainer />,
		errorElement: <ErrorComponent />,
		children: [
			{
				index: true,
				lazy: () => import('@/features/home/pages'),
				handle: {
					title: () => 'Home',
				},
			},
			{
				path: 'account',
				handle: {
					title: () => 'Account',
				},
				children: [
					{
						index: true,
						lazy: () => import('@/features/auth/pages/profile'),
					},
				],
			},
			{
				path: 'holidays',
				handle: {
					title: () => 'Holidays',
				},
				lazy: () => import('@/features/holidays/pages'),
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
					{
						path: 'table',
						lazy: () => import('@/features/demos/pages/table'),
					},
				],
			},
			{
				path: 'budget',
				handle: {
					title: () => 'Budgets',
				},
				children: [
					{
						index: true,
						lazy: () => import('@/features/budget/pages/budget'),
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
		lazy: () => import('@/features/auth/components/shell'),
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
