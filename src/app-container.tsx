import { Navigate, useLocation } from 'react-router-dom';
import { App } from '@/app';
import { selectIsAuthenticated } from '@/features/auth/state/selectors';
import { useAppSelector } from '@/common/hooks';
import { Layout } from '@/features/layout';

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
				<Navigate replace to="/auth/signin" state={{ from: location }} />
			)}
		</>
	);
};
