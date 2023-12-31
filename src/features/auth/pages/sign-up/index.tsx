import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { Divider } from '@/common/components/divider';
import { SignupForm } from '@/features/auth/components/signup-form';
import type { InferredSignupSchema } from '@/features/auth/types';
import {
	addNotification,
	setNavigationHidden,
	setToolsHidden,
} from '@/features/layout/state/slice';
import { useAppDispatch } from '@/common/hooks';
import { ToggleUiSettings } from '../../components/toggle-ui-settings';
import { useSignupMutation } from '../../state/api';
import styles from './styles.module.scss';

export const Component = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [signup, { isLoading }] = useSignupMutation();

	useEffect(() => {
		dispatch(setNavigationHidden(true));
		dispatch(setToolsHidden(true));
	}, [dispatch]);

	const handleSubmitSignup: SubmitHandler<InferredSignupSchema> = async (
		data: InferredSignupSchema,
	) => {
		try {
			const normalize = { ...data, email: data.email };

			await signup(normalize).unwrap();
		} catch (error) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'error',
					header: 'Failed to sign up.',
				}),
			);
		}
	};

	return (
		<div className={styles['signup-form']}>
			<SpaceBetween size="l" direction="vertical">
				<Container
					header={
						<Header variant="h1" description="It's quick and easy.">
							Sign up
						</Header>
					}
				>
					<Box margin={{ top: 'xl' }}>
						<SpaceBetween size="m">
							<SignupForm
								handleSubmitSignup={handleSubmitSignup}
								signinState={{ isLoading }}
							/>
							<Divider>Have an eztrack account?</Divider>
							<Box margin={{ left: 'xxxl', right: 'xxxl' }}>
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
							</Box>
						</SpaceBetween>
					</Box>
				</Container>
				<Container>
					<Divider>UI</Divider>
					<ToggleUiSettings />
				</Container>
			</SpaceBetween>
		</div>
	);
};
