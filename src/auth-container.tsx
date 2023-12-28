import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Loader } from './common/components/loader';
import { useAppSelector } from './common/hooks';
import { useAppDispatch } from './common/hooks/use-app-dispatch';
import { useVerifyMutation } from './features/auth/state/api';
import { selectIsAuthenticated } from './features/auth/state/selectors';
import { setIsAuthenticated, setUser } from './features/auth/state/slice';
import { addNotification } from './features/layout/state/slice';

export const AuthContainer = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	const [verifySession, { isLoading: isVerifying }] = useVerifyMutation();

	useEffect(() => {
		const verify = async () => {
			try {
				const payload = await verifySession().unwrap();

				dispatch(setIsAuthenticated(true));
				dispatch(setUser(payload.user ?? {}));
			} catch (error) {
				dispatch(setIsAuthenticated(false));
				dispatch(setUser({}));
				dispatch(
					addNotification({
						id: `noti-${Date.now()}`,
						type: 'error',
						header: 'Your session has ended. Please sign in.',
					}),
				);

				navigate('/auth/signin', { state: { from: location.pathname } });
			}
		};

		if (!isAuthenticated && !isVerifying) {
			void verify();
		}
	}, [
		dispatch,
		navigate,
		location.pathname,
		verifySession,
		isAuthenticated,
		isVerifying,
	]);

	if (isVerifying) {
		return <Loader />;
	}

	return <Outlet />;
};
