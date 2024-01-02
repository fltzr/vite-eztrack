import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/common/hooks';
import { useVerifyMutation } from '../state/api';
import { setAuthState } from '../state/slice';

export const useAuthVerification = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [isInitializing, setIsInitializing] = useState(true);
	const [verify, { isLoading }] = useVerifyMutation();

	useEffect(() => {
		const verifyAuthentication = async () => {
			console.log('verifyAuthentication');

			setIsInitializing(true);
			try {
				const payload = await verify(undefined).unwrap();

				if (payload.data) {
					dispatch(
						setAuthState({
							user: payload.data,
							isAuthenticated: Boolean(payload.data),
						}),
					);
				} else {
					dispatch(setAuthState({ user: null, isAuthenticated: false }));
				}
			} catch (error) {
				dispatch(setAuthState({ user: null, isAuthenticated: false }));
			} finally {
				setIsInitializing(false);
			}
		};

		void verifyAuthentication();
	}, [dispatch, verify, location]);

	return { isVerifying: isLoading, isInitializing };
};
