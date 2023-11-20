import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormInput } from '@/common/components/form/input';
import { selectSigninError, selectIsAuthenticating } from '@/features/auth/selectors';
import { type InferredSigninSchema, signinSchema } from '@/features/auth/types';
import { useAppSelector } from '@/common/hooks';

interface SigninFormProps {
	handleSignin: (data: InferredSigninSchema) => void;
}
export const SigninForm = ({ handleSignin }: SigninFormProps) => {
	const isAuthenticating = useAppSelector(selectIsAuthenticating);
	const serverError = useAppSelector(selectSigninError);

	const methods = useForm<InferredSigninSchema>({
		resolver: zodResolver(signinSchema),
	});

	return (
		<SpaceBetween size="m" direction="vertical">
			<FormProvider {...methods}>
				<Form errorText={serverError}>
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
								name="identity"
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
				loading={isAuthenticating}
				loadingText="Signing in..."
				disabled={Object.keys(methods.formState.errors).length > 0}
			>
				Log in
			</Button>
		</SpaceBetween>
	);
};
