import { useNavigate } from 'react-router-dom';
import { isError } from 'lodash-es';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { Divider } from '@/common/components/divider';
import { CreateAccountButton } from '@/features/auth/components/create-account-button';
import { SigninForm } from '@/features/auth/components/signin-form';
import type { InferredSigninSchema } from '@/features/auth/types';
import { addNotification } from '@/features/layout/state/slice';
import { useAppDispatch } from '@/common/hooks';
import { ToggleUiSettings } from '../../components/toggle-ui-settings';
import { useSigninMutation } from '../../state/api';
import { setUser } from '../../state/slice';
import styles from './styles.module.scss';

export const Component = () => {
	const [signin, { isLoading, isError: isSigninError }] = useSigninMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSubmitLogin = async (data: InferredSigninSchema) => {
		try {
			const payload = await signin(data).unwrap();

			dispatch(setUser(payload.user));
			navigate('/', { replace: true });
		} catch (error) {
			if (isError(error)) {
				dispatch(
					addNotification({
						autoDismiss: true,
						id: `notification-${Date.now()}`,
						type: 'error',
						header: 'Operation failed.',
						content: `Error: ${error.message}`,
					}),
				);
			}
		}
	};

	return (
		<div className={styles['auth-form']}>
			<SpaceBetween size="l" direction="vertical">
				<SpaceBetween size="xl" direction="vertical">
					<Container header={<Header variant="h1">Sign in</Header>}>
						<Box margin={{ top: 'l', bottom: 'xxxl' }}>
							<SpaceBetween size="s" direction="vertical">
								<SigninForm
									signinState={{ isLoading, isError: isSigninError }}
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
