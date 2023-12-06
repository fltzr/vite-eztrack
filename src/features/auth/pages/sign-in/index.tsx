import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Divider } from '@/common/components/divider';
import { CreateAccountButton } from '@/features/auth/components/create-account-button';
import { SigninForm } from '@/features/auth/components/signin-form';
import { selectIsAuthenticated } from '@/features/auth/state/selectors';
import { signin } from '@/features/auth/state/slice';
import type { InferredSigninSchema } from '@/features/auth/types';
import {
	addNotification,
	setNavigationHidden,
	setToolsHidden,
} from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { ToggleUiSettings } from '../../components/toggle-ui-settings';

import styles from './styles.module.scss';

export const Component = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as { from?: string; userSignout?: boolean } | undefined;
	const from = state?.from ?? '/';

	console.log(state);

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
			<SpaceBetween size="l" direction="vertical">
				<div className={styles['auth-alert']}>
					{state?.userSignout ? (
						<Alert type="info">Successfully signed out.</Alert>
					) : null}
				</div>
				<SpaceBetween size="xl" direction="vertical">
					<Container header={<Header variant="h1">Sign in</Header>}>
						<Box margin={{ top: 'l', bottom: 'xxxl' }}>
							<SpaceBetween size="s" direction="vertical">
								<SigninForm
									handleSignin={(data) => {
										void handleSubmitLogin(data);
									}}
								/>
								<Divider>New to eztrack?</Divider>
								<CreateAccountButton />
							</SpaceBetween>
						</Box>
					</Container>
					<Container>
						<Divider>UI</Divider>
						<ToggleUiSettings />
					</Container>
				</SpaceBetween>
			</SpaceBetween>
		</div>
	);
};
