import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash-es';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormInput } from '@/common/components/form/input';
import { FormSelect } from '@/common/components/form/select';
import { type InferredSignupSchema, signupSchema } from '@/features/auth/types';

type SignupFormProps = {
	handleSubmitSignup: (data: InferredSignupSchema) => void;
	signinState: {
		isLoading: boolean;
	};
};
export const SignupForm = ({ handleSubmitSignup, signinState }: SignupFormProps) => {
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
					<Form>
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
									name="birthdate"
									placeholder="YYYY/MM/DD"
								/>
							</ColumnLayout>

							<FormInput<InferredSignupSchema>
								inputMode="tel"
								name="phone"
								placeholder="555-555-5555"
							/>

							<FormInput<InferredSignupSchema>
								name="address1"
								placeholder="Address"
							/>

							<FormInput<InferredSignupSchema>
								name="address2"
								placeholder="Address 2"
							/>

							<ColumnLayout columns={3} minColumnWidth={120}>
								<FormInput<InferredSignupSchema>
									name="city"
									placeholder="City"
								/>

								<FormInput<InferredSignupSchema>
									name="state"
									placeholder="State"
								/>

								<FormInput<InferredSignupSchema>
									inputMode="numeric"
									name="zipcode"
									placeholder="Zip"
								/>
							</ColumnLayout>

							<FormInput<InferredSignupSchema>
								name="country"
								placeholder="Country"
							/>
						</SpaceBetween>
					</Form>
				</form>
			</FormProvider>
			<Button
				fullWidth
				formAction="submit"
				form="signup-form"
				variant="primary"
				loading={signinState.isLoading}
				disabled={isEmpty(methods.formState.errors)}
			>
				Create account
			</Button>
		</SpaceBetween>
	);
};
