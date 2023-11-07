import { useAppDispatch } from '@/common/hooks';
import {
	Button,
	ColumnLayout,
	Container,
	DatePicker,
	Form,
	FormField,
	Grid,
	Header,
	Input,
	Select,
	SpaceBetween,
} from '@cloudscape-design/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import './styles.module.scss';
import { endOfDay, isBefore, subYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const signinSchema = z.object({
	firstname: z.string().min(3, "What's your name?").max(10),
	lastname: z.string().min(3, "What's your name?").max(10),
	email: z.string().email('This will be what you use to sign in.'),
	username: z.string().min(3, 'Username is required.').max(10),
	password: z.string().min(8, 'Please enter a valid password.').max(20),
	birthday: z.string().min(8, 'Please enter a valid birthday.').max(20),
	gender: z.string().min(1, 'Please choose a gender. You can change this later.'),
});

type InferredSigninSchema = z.infer<typeof signinSchema>;

// Define action types as constants
const SET_NAVIGATION_HIDDEN = 'layout/setNavigationHidden';
const SET_TOOLS_HIDDEN = 'layout/setToolsHidden';

// Form field components
const FirstnameField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField errorText={error} stretch>
		<Controller
			name="firstname"
			control={control}
			render={({ field }) => (
				<Input {...field} placeholder="First name" onChange={(event) => field.onChange(event.detail.value)} />
			)}
		/>
	</FormField>
);

const LastnameField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField errorText={error} stretch>
		<Controller
			name="lastname"
			control={control}
			render={({ field }) => (
				<Input {...field} placeholder="Last name" onChange={(event) => field.onChange(event.detail.value)} />
			)}
		/>
	</FormField>
);

const EmailField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField errorText={error}>
		<Controller
			name="email"
			control={control}
			render={({ field }) => (
				<Input {...field} placeholder="Email" onChange={(event) => field.onChange(event.detail.value)} />
			)}
		/>
	</FormField>
);

const UsernameField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField errorText={error}>
		<Controller
			name="username"
			control={control}
			render={({ field }) => (
				<Input {...field} placeholder="Username" onChange={(event) => field.onChange(event.detail.value)} />
			)}
		/>
	</FormField>
);

const PasswordField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField errorText={error}>
		<Controller
			name="password"
			control={control}
			render={({ field }) => (
				<Input
					{...field}
					type="password"
					placeholder="Password"
					onChange={(event) => field.onChange(event.detail.value)}
				/>
			)}
		/>
	</FormField>
);

const minimumAgeRequirement = endOfDay(subYears(new Date(), 18));
const disableDatesBeforeMinimumAgeRequirement = (date: Date) => !isBefore(date, minimumAgeRequirement);

const BirthdayField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField label="Birthday" errorText={error}>
		<Controller
			name="birthday"
			control={control}
			render={({ field }) => (
				<DatePicker
					{...field}
					value={field.value}
					onChange={(event) => field.onChange(event.detail.value)}
					isDateEnabled={disableDatesBeforeMinimumAgeRequirement}
					openCalendarAriaLabel={(selectedDate) =>
						'Choose birthday' + (selectedDate ? `, selected date is ${selectedDate}` : '')
					}
				/>
			)}
		/>
	</FormField>
);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const GenderField = ({ control, error }: { control: Control<InferredSigninSchema>; error?: string }) => (
	<FormField label="Gender" errorText={error}>
		<Controller
			name="gender"
			control={control}
			render={({ field }) => (
				<Select
					{...field}
					placeholder="Gender"
					selectedOption={field.value ? { label: capitalize(field.value), value: field.value } : null}
					onChange={({ detail }) => field.onChange(detail.selectedOption.value)}
					invalid={!!error}
					options={[
						{ label: 'Male', value: 'male' },
						{ label: 'Female', value: 'female' },
						{ label: 'Other/Prefer not to say', value: 'other' },
					]}
				/>
			)}
		/>
	</FormField>
);

export const Component = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

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
				<SpaceBetween size="m">
					<form id="signup-form" onSubmit={handleSubmit(handleSubmitLogin)}>
						<Form errorText={Object.keys(errors).length > 0 ? 'Please correct the errors above' : null}>
							<SpaceBetween size="m">
								<ColumnLayout columns={2} minColumnWidth={150}>
									<FirstnameField control={control} error={errors.firstname?.message} />
									<LastnameField control={control} error={errors.lastname?.message} />
								</ColumnLayout>
								<EmailField control={control} error={errors.email?.message} />
								<UsernameField control={control} error={errors.username?.message} />
								<PasswordField control={control} error={errors.password?.message} />
								<ColumnLayout columns={2} minColumnWidth={150}>
									<BirthdayField control={control} error={errors.birthday?.message} />
									<GenderField control={control} error={errors.gender?.message} />
								</ColumnLayout>
							</SpaceBetween>
						</Form>
					</form>
					<Button
						formAction="submit"
						form="signup-form"
						variant="primary"
						fullWidth
						disabled={Object.keys(errors).length > 0}
					>
						Create account
					</Button>
					<hr className="divider" />
					<Grid gridDefinition={[{ colspan: 2 }, { colspan: 8 }, { colspan: 2 }]}>
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
