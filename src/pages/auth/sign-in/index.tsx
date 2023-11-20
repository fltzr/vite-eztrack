import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { ChangeDensityButton } from '@/common/components/change-density-button';
import { ChangeThemeButton } from '@/common/components/change-theme-button';
import { Divider } from '@/common/components/divider';
import { selectIsAuthenticated } from '@/features/auth/selectors';
import { signin } from '@/features/auth/slice';
import type { InferredSigninSchema } from '@/features/auth/types';
import { setNavigationHidden, setToolsHidden } from '@/features/layout/slice';
import { CreateAccountButton } from '@/pages/auth/components/create-account-button';
import { SigninForm } from '@/pages/auth/components/signin-form';
import { useAppDispatch, useAppSelector } from '@/common/hooks';

import styles from './styles.module.scss';

export const Component = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

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
		console.log(`[Auth] Sign-in: `, data);
		try {
			await dispatch(signin(data));
		} catch (error) {
			console.log(error);
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
