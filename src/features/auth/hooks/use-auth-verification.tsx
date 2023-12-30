import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/common/hooks';
import { useVerifyMutation } from '../state/api';
import { setAuthState } from '../state/slice';

export const useAuthVerification = () => {
	const dispatch = useAppDispatch();
	const [verify, { isLoading, isError, isSuccess }] = useVerifyMutation();
	const [isVerififying, setIsVerifying] = useState(true);

	useEffect(() => {
		const verifyAuthentication = async () => {
			try {
				const payload = await verify().unwrap();

				if (payload.user) {
					dispatch(
						setAuthState({
							user: payload.user,
							isAuthenticated: Boolean(payload.user),
						}),
					);
				} else {
					dispatch(setAuthState({ user: null, isAuthenticated: false }));
				}
			} catch (error) {
				dispatch(setAuthState({ user: null, isAuthenticated: false }));
			}
		};

		void verifyAuthentication();
	}, [dispatch, verify]);
};
