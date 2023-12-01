import ContentLayout, {
	type ContentLayoutProps,
} from '@cloudscape-design/components/content-layout';
import Header, { type HeaderProps } from '@cloudscape-design/components/header';

type PageLayoutProps = Omit<HeaderProps, 'children'> &
	Omit<ContentLayoutProps, 'header'> & { title: string };

export const PageLayout = ({ ...props }: PageLayoutProps) => (
	<ContentLayout
		{...props}
		header={
			<Header
				variant={props.variant}
				description={props.description}
				actions={props.actions}
			>
				{props.title}
			</Header>
		}
	/>
);
