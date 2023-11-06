import { useAppDispatch } from '@/common/hooks';
import {
	Button,
	Container,
	Form,
	FormField,
	Grid,
	Header,
	Input,
	Link,
	SpaceBetween,
} from '@cloudscape-design/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import './styles.module.scss';

const signinSchema = z.object({
	firstname: z.string().min(3, "What's your name?").max(10),
	lastname: z.string().min(3, "What's your name?").max(10),
	email: z.string().email('This will be what you use to sign in.'),
	username: z.string().min(3, 'Username is required.').max(10),
	password: z.string().min(8, 'Please enter a valid password.').max(20),
	birthday: z.string().min(8, 'Please enter a valid date.').max(20),
});

type InferredSigninSchema = z.infer<typeof signinSchema>;

// Define action types as constants
const SET_NAVIGATION_HIDDEN = 'layout/setNavigationHidden';
const SET_TOOLS_HIDDEN = 'layout/setToolsHidden';

// Form field components
const FirstnameField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField stretch label="First name" errorText={error}>
		<Controller
			name="firstname"
			control={control}
			render={({ field }) => <Input {...field} onChange={(event) => field.onChange(event.detail.value)} />}
		/>
	</FormField>
);

const LastnameField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField stretch label="Last name" errorText={error}>
		<Controller
			name="lastname"
			control={control}
			render={({ field }) => <Input {...field} onChange={(event) => field.onChange(event.detail.value)} />}
		/>
	</FormField>
);

const EmailField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField label="Email" errorText={error}>
		<Controller
			name="email"
			control={control}
			render={({ field }) => <Input {...field} onChange={(event) => field.onChange(event.detail.value)} />}
		/>
	</FormField>
);

const UsernameField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField label="Username" errorText={error}>
		<Controller
			name="username"
			control={control}
			render={({ field }) => <Input {...field} onChange={(event) => field.onChange(event.detail.value)} />}
		/>
	</FormField>
);

const PasswordField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField
		label="Password"
		errorText={error}
		constraintText={
			<Link variant="info" href="#">
				Forgot password?
			</Link>
		}
	>
		<Controller
			name="password"
			control={control}
			render={({ field }) => (
				<Input {...field} type="password" onChange={(event) => field.onChange(event.detail.value)} />
			)}
		/>
	</FormField>
);

const BirthdateField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField label="Birthday" errorText={error}>
		<Controller
			name="birthday"
			control={control}
			render={({ field }) => <Input {...field} onChange={(event) => field.onChange(event.detail.value)} />}
		/>
	</FormField>
);

export const Component = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch({ type: SET_NAVIGATION_HIDDEN, payload: true });
		dispatch({ type: SET_TOOLS_HIDDEN, payload: true });
		// Empty dependency array to ensure this runs only once on mount
	}, [dispatch]);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<InferredSigninSchema>({
		resolver: zodResolver(signinSchema),
	});

	const handleSubmitLogin = (data: InferredSigninSchema) => {
		console.log(data);
		// Dispatch an action or call an API to handle form submission
	};

	return (
		<div className="auth-form" style={{ width: 455 }}>
			<Container
				header={
					<Header variant="h1" description="It's quick and easy.">
						Sign up
					</Header>
				}
			>
				<SpaceBetween size="xxl" direction="vertical">
					<form id="log-in-form" onSubmit={handleSubmit(handleSubmitLogin)}>
						<Form>
							<SpaceBetween size="s" direction="horizontal">
								<FirstnameField control={control} error={errors.firstname?.message} />
								<LastnameField control={control} error={errors.lastname?.message} />
								<SpaceBetween size="s" direction="vertical">
									<UsernameField control={control} error={errors.username?.message} />
									<PasswordField control={control} error={errors.password?.message} />
								</SpaceBetween>
							</SpaceBetween>
						</Form>
					</form>
					<Button
						formAction="submit"
						form="log-in-form"
						variant="primary"
						fullWidth
						disabled={Object.keys(errors).length > 0}
					>
						Log in
					</Button>
					<hr className="divider" />
					<Grid gridDefinition={[{ colspan: 2 }, { colspan: 8 }, { colspan: 2 }]}>
						<div></div>
						<Button fullWidth variant="normal" wrapText={false} formAction="none">
							Create account
						</Button>
						<div></div>
					</Grid>
				</SpaceBetween>
			</Container>
		</div>
	);
};
