import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

interface CopyBlockProps {
	resource: string;
	content: string;
}

export const CopyBlock = ({ ...props }: CopyBlockProps) => (
	<Popover
		size="small"
		position="top"
		triggerType="custom"
		dismissButton={false}
		content={
			<StatusIndicator type="success">{props.resource} copied</StatusIndicator>
		}
	>
		<Button
			iconName="copy"
			onClick={() => {
				void navigator.clipboard.writeText(props.content);
			}}
		>
			Copy
		</Button>
	</Popover>
);
