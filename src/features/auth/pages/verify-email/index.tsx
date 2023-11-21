import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import styles from './styles.module.scss';

export const Component = () => (
	<div className={styles.container}>
		<Container header={<Header variant="h2">Verify your email</Header>}>
			<Box variant="span">
				A verification email was sent to [email]. Please check your email.
			</Box>
		</Container>
	</div>
);
