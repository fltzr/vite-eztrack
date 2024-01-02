import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useOnlineListener } from '@/features/layout/hooks/use-online-listener';
import { Loader } from './common/components/loader';
import { useAppDispatch } from './common/hooks';
import { useAuthVerification } from './features/auth/hooks/use-auth-verification';
import { addNotification } from './features/layout/state/slice';

export const Container = () => {
	const { isVerifying, isInitializing } = useAuthVerification();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const state = location.state as {
		from?: string;
		attemptToAccessProtectedResource?: boolean;
		userSignout?: boolean;
	};

	useOnlineListener();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (state?.userSignout) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'info',
					header: 'Successfully signed out.',
				}),
			);
		}
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	}, [dispatch, state?.userSignout]);

	if (isVerifying || isInitializing) {
		return <Loader />;
	}

	return <Outlet />;
};
