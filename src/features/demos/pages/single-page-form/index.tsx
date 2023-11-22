import Container from '@cloudscape-design/components/container';
import { SigninForm } from '@/features/auth/components/signin-form';

export const Component = () => (
	<Container>
		<SigninForm handleSignin={() => ''} />
	</Container>
);
