import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Divider } from '@/common/components/divider';
import { CreateAccountButton } from '@/features/auth/components/create-account-button';
import { SigninForm } from '@/features/auth/components/signin-form';
import { selectIsAuthenticated } from '@/features/auth/state/selectors';
import { signin } from '@/features/auth/state/slice';
import type { InferredSigninSchema } from '@/features/auth/types';
import { ChangeDensityButton } from '@/features/layout/components/change-density-button';
import { ChangeThemeButton } from '@/features/layout/components/change-theme-button';
import {
	addNotification,
	setNavigationHidden,
	setToolsHidden,
} from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';

import styles from './styles.module.scss';

export const Component = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const from = (location.state?.from?.pathname as string) || '/';
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	useEffect(() => {
		dispatch(setNavigationHidden(true));
		dispatch(setToolsHidden(true));
	}, [dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
			navigate(from, { replace: true });
		}
	}, [from, isAuthenticated, navigate]);

	const handleSubmitLogin = async (data: InferredSigninSchema) => {
		try {
			await dispatch(signin(data));
		} catch (error) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'error',
					content: 'Failed to sign in. Please try again.',
				}),
			);
		}
	};

	return (
		<div className={styles['auth-form']}>
			<SpaceBetween size="xxl" direction="vertical">
				<Container header={<Header variant="h1">Sign in</Header>}>
					<SpaceBetween size="xxl" direction="vertical">
						<SigninForm
							handleSignin={(data) => void handleSubmitLogin(data)}
						/>
						<Divider>New to eztrack?</Divider>
						<CreateAccountButton />
					</SpaceBetween>
				</Container>
				<SpaceBetween size="m" direction="horizontal">
					<ChangeThemeButton />
					<ChangeDensityButton />
				</SpaceBetween>
			</SpaceBetween>
		</div>
	);
};
