import { useNavigate } from 'react-router-dom';
import Button from '@cloudscape-design/components/button';
import Grid from '@cloudscape-design/components/grid';

export const CreateAccountButton = () => {
	const navigate = useNavigate();

	return (
		<Grid gridDefinition={[{ colspan: 2 }, { colspan: 8 }, { colspan: 2 }]}>
			<div></div>
			<Button
				fullWidth
				variant="normal"
				wrapText={false}
				formAction="none"
				onClick={(event) => {
					event.preventDefault();
					navigate('/auth/signup');
				}}
			>
				Create account
			</Button>
			<div></div>
		</Grid>
	);
};
