/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Grid from '@cloudscape-design/components/grid';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

import { Divider } from '@/common/components/divider';
import { SignupForm } from '@/features/auth/components/signup-form';
import {
	selectSignupError,
	selectIsAuthenticated,
} from '@/features/auth/state/selectors';
import { signup } from '@/features/auth/state/slice';
import type { InferredSignupSchema } from '@/features/auth/types';
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

	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const serverError = useAppSelector(selectSignupError);

	useEffect(() => {
		dispatch(setNavigationHidden(true));
		dispatch(setToolsHidden(true));
	}, [dispatch]);

	useEffect(() => {
		if (!isAuthenticated) {
			return;
		}

		const from: string = location.state?.from || '/';

		navigate(from, { replace: true });
	}, [location.state?.from, isAuthenticated, navigate]);

	const handleSubmitSignup: SubmitHandler<InferredSignupSchema> = async (
		data: InferredSignupSchema,
	) => {
		try {
			const normalize = { ...data, email: data.email };

			await dispatch(signup(normalize));
		} catch (error) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'error',
					header: 'Failed to sign up.',
					content: serverError,
				}),
			);
		}
	};

	return (
		<div className={styles['signup-form']}>
			<Container
				header={
					<Header variant="h1" description="It's quick and easy.">
						Sign up
					</Header>
				}
			>
				<SpaceBetween size="m">
					<SignupForm handleSubmitSignup={handleSubmitSignup} />
					<Divider>Have an eztrack account?</Divider>
					<Grid
						gridDefinition={[{ colspan: 2 }, { colspan: 8 }, { colspan: 2 }]}
					>
						<div></div>
						<Button
							fullWidth
							variant="normal"
							wrapText={false}
							formAction="none"
							onClick={(event) => {
								event.preventDefault();
								navigate('/auth/signin');
							}}
						>
							Sign in
						</Button>
						<div></div>
					</Grid>
				</SpaceBetween>
			</Container>
		</div>
	);
};
