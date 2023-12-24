/* eslint-disable react/no-multi-comp */
import { Navigate, useLocation } from 'react-router-dom';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import { App } from '@/app';
import { selectIsAuthenticated } from '@/features/auth/state/selectors';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { Layout } from '@/features/layout';
import { HelpPanelProvider } from './common/hooks/use-help-panel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setIsAuthenticated, setUser } from './features/auth/state/slice';
import type { User } from './features/auth/types';
import { addNotification } from './features/layout/state/slice';
import { Loader } from './common/components/loader';

export const AppContainer = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verify = async () => {
			try {
				const response = await axios.get<{
					user: Partial<User>;
					message: string;
				}>('/api/verify');
				if (response.status === 200) {
					dispatch(setIsAuthenticated(true));
					dispatch(setUser(response.data.user));
				}
			} catch (error) {
				dispatch(
					addNotification({
						autoDismiss: true,
						id: `notification-${Date.now()}`,
						type: 'error',
						header: 'Operation failed.',
						content: 'Invalid session. Please sign in.',
					}),
				);
			} finally {
				setIsLoading(false);
			}
		};

		verify();
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<I18nProvider messages={[enMessages]}>
			{isAuthenticated ? (
				<Layout>
					<HelpPanelProvider value={null}>
						<App />
					</HelpPanelProvider>
				</Layout>
			) : (
				<Navigate replace to="/auth/signin" state={{ from: location }} />
			)}
		</I18nProvider>
	);
};
