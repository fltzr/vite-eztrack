import Form from '@cloudscape-design/components/form';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../form/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/common/hooks';
import { selectSigninError, selectIsAuthenticating } from '@/features/auth/selectors';
import Button from '@cloudscape-design/components/button';
import { InferredSigninSchema, signinSchema } from '@/features/auth/types';

type SigninFormProps = {
    handleSignin: (data: InferredSigninSchema) => void;
};
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
                    <form id="log-in-form" onSubmit={methods.handleSubmit(handleSignin)}>
                        <SpaceBetween size="s" direction="vertical">
                            <FormInput<InferredSigninSchema>
                                type="text"
                                name="identity"
                                placeholder="Email or username"
                                disableBrowserAutocorrect
                                spellcheck={false}
                                autoComplete={false}
                            />
                            <FormInput<InferredSigninSchema>
                                type="password"
                                name="password"
                                placeholder="Password"
                                disableBrowserAutocorrect
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
