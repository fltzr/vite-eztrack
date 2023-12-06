import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Popover from '@cloudscape-design/components/popover';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import styles from './styles.module.scss';

type CopyLineProps = {
	resource: string;
	content: string;
};
export const CopyLine = ({ ...props }: CopyLineProps) => (
	<span className={styles['word-wrap']}>
		<Box margin={{ right: 'xxs' }} display="inline-block">
			<Popover
				size="small"
				position="top"
				triggerType="custom"
				dismissButton={false}
				content={
					<StatusIndicator type="success">
						{props.resource} copied
					</StatusIndicator>
				}
			>
				<Button
					variant="inline-icon"
					iconName="copy"
					ariaLabel={`Copy ${props.resource}`}
					onClick={() => {
						void navigator.clipboard.writeText(props.content);
					}}
				/>
			</Popover>
		</Box>
		{props.content}
	</span>
);
