import { FormInput } from '@/common/components/form/input';
import { SigninForm } from '@/common/components/signin-form';
import { SignupForm } from '@/common/components/signup-form';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    firstname: z.string().min(1, 'Required.'),
    lastname: z.string().min(1, 'Required.'),
    email: z.string().email().min(1, 'Required.'),
});

type InferredSchema = z.infer<typeof schema>;

export const Component = () => {
    const methods = useForm<InferredSchema>({
        resolver: zodResolver(schema),
    });

    const handleFormSubmit = (data: InferredSchema) => {
        console.log(data);
    };

    return (
        <Container>
            <SigninForm handleSignin={() => ''} />
        </Container>
    );
};
