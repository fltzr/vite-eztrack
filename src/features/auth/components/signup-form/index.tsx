import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormInput } from '@/common/components/form/input';
import { FormSelect } from '@/common/components/form/select';
import { useAppSelector } from '@/common/hooks/use-app-selector';
import {
	selectSignupError,
	selectIsAuthenticating,
} from '@/features/auth/state/selectors';
import { type InferredSignupSchema, signupSchema } from '@/features/auth/types';

export const SignupForm = ({
	handleSubmitSignup,
}: {
	handleSubmitSignup: (data: InferredSignupSchema) => void;
}) => {
	const isAuthenticating = useAppSelector(selectIsAuthenticating);
	const serverError = useAppSelector(selectSignupError);

	const methods = useForm<InferredSignupSchema>({
		resolver: zodResolver(signupSchema),
	});

	return (
		<SpaceBetween size="xxl" direction="vertical">
			<FormProvider {...methods}>
				<form
					id="signup-form"
					onSubmit={(event) => {
						void methods.handleSubmit(handleSubmitSignup)(event);
					}}
				>
					<Form
						errorText={
							Object.keys(methods.formState.errors).length > 0
								? 'Please correct the errors above'
								: serverError
						}
					>
						<SpaceBetween size="m">
							<ColumnLayout columns={2} minColumnWidth={150}>
								<FormInput<InferredSignupSchema>
									name="firstname"
									placeholder="First name"
								/>
								<FormInput<InferredSignupSchema>
									name="lastname"
									placeholder="First name"
								/>
							</ColumnLayout>

							<FormInput<InferredSignupSchema>
								name="email"
								placeholder="Email"
							/>

							<FormInput<InferredSignupSchema>
								name="username"
								placeholder="Username"
							/>

							<FormInput<InferredSignupSchema>
								sensitive
								stretch
								name="password"
								placeholder="Password"
							/>

							<FormInput<InferredSignupSchema>
								sensitive
								stretch
								name="passwordConfirm"
								placeholder="Confirm password"
							/>

							<ColumnLayout columns={2} minColumnWidth={150}>
								<FormSelect<InferredSignupSchema>
									name="gender"
									options={[
										{ value: 'male', label: 'Male' },
										{ value: 'female', label: 'Female' },
										{ value: 'other', label: 'Other' },
										{
											value: 'na',
											label: 'Prefer not to specify',
										},
									]}
								/>

								<FormDatePicker<InferredSignupSchema>
									name="birthday"
									placeholder="YYYY/MM/DD"
								/>
							</ColumnLayout>
						</SpaceBetween>
					</Form>
				</form>
			</FormProvider>
			<Button
				fullWidth
				formAction="submit"
				form="signup-form"
				variant="primary"
				loading={isAuthenticating}
				disabled={Object.keys(methods.formState.errors).length > 0}
			>
				Create account
			</Button>
		</SpaceBetween>
	);
};
