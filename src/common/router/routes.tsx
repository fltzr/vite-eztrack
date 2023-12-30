import type { RouteObject } from 'react-router-dom';
import { constant } from 'lodash-es';
import { AppContainer } from '@/app/app-container';
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
					title: constant('Home'),
				},
			},
			{
				path: 'account',
				handle: {
					title: constant('Account'),
				},
				children: [
					{
						index: true,
						lazy: () => import('@/features/auth/pages/profile'),
					},
				],
			},
			{
				path: 'budget',
				handle: {
					title: constant('Budget'),
				},
				children: [
					{
						index: true,
						lazy: () => import('@/features/budget/pages/budget'),
					},
				],
			},
		],
	},
	{
		path: 'auth',
		lazy: () => import('@/features/auth/pages'),
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
