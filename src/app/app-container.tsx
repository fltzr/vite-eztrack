import { Navigate, useLocation } from 'react-router-dom';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import enMessages from '@cloudscape-design/components/i18n/messages/all.en.json';
import { App } from '@/app';
import { Loader } from '@/common/components/loader';
import { useAuthVerification } from '@/features/auth/hooks/use-auth-verification';
import { selectIsAuthenticated } from '@/features/auth/state/selectors';
import { useAppSelector } from '@/common/hooks';
import { Layout } from '@/features/layout';
import { HelpPanelProvider } from '../common/hooks/use-help-panel';

export const AppContainer = () => {
	const location = useLocation();
	const { isVerifying, isInitializing } = useAuthVerification();

	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	if (isVerifying || isInitializing) {
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
				<Navigate
					replace
					to="/auth/signin"
					state={{
						from: location.pathname,
						attemptToAccessProtectedResource: true,
					}}
				/>
			)}
		</I18nProvider>
	);
};
