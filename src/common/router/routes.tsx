import type { RouteObject } from 'react-router-dom';
import { AppContainer } from '@/app/app-container';
import { AuthContainer } from '@/auth-container';
import { ErrorComponent } from '@/common/layouts/error-component';

export const routes: RouteObject[] = [
	{
		element: <AuthContainer />,
		children: [
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
		],
	},
];
