import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormInput } from '@/common/components/form/input';
import { type InferredSigninSchema, signinSchema } from '@/features/auth/types';

interface SigninFormProps {
	handleSignin: (data: InferredSigninSchema) => void;
	signinState: {
		isLoading: boolean;
		isError: boolean;
	};
}
export const SigninForm = ({ handleSignin, signinState }: SigninFormProps) => {
	const methods = useForm<InferredSigninSchema>({
		resolver: zodResolver(signinSchema),
	});

	return (
		<SpaceBetween size="m" direction="vertical">
			<FormProvider {...methods}>
				<Form>
					<form
						id="log-in-form"
						onSubmit={(event) => {
							void methods.handleSubmit(handleSignin)(event);
						}}
					>
						<SpaceBetween size="s" direction="vertical">
							<FormInput<InferredSigninSchema>
								disableBrowserAutocorrect
								type="text"
								name="username"
								placeholder="Email or username"
								spellcheck={false}
								autoComplete={false}
							/>
							<FormInput<InferredSigninSchema>
								disableBrowserAutocorrect
								type="password"
								name="password"
								placeholder="Password"
								spellcheck={false}
								autoComplete={false}
							/>
						</SpaceBetween>
					</form>
				</Form>
			</FormProvider>
			<Button
				fullWidth
				formAction="submit"
				form="log-in-form"
				variant="primary"
				loading={signinState.isLoading}
				loadingText="Signing in..."
				disabled={Object.keys(methods.formState.errors).length > 0}
			>
				Log in
			</Button>
		</SpaceBetween>
	);
};
