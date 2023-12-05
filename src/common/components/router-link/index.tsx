import { useNavigate } from 'react-router-dom';
import Link, { type LinkProps } from '@cloudscape-design/components/link';

type RouterLinkProps = LinkProps & {
	label: string;
	to: string;
};

export const RouterLink = ({ ...props }: RouterLinkProps) => {
	const navigate = useNavigate();

	return (
		<Link
			{...props}
			onFollow={(event) => {
				event.preventDefault();
				navigate(props.to, { replace: true });
			}}
		>
			{props.label}
		</Link>
	);
};
