import Container from '@cloudscape-design/components/container';
import { SigninForm } from '@/pages/auth/components/signin-form';

export const Component = () => (
	<Container>
		<SigninForm handleSignin={() => ''} />
	</Container>
);
