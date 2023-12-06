/* eslint-disable react/no-multi-comp */
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';

export const TableNoMatchState = ({
	handleClearFilter,
}: {
	handleClearFilter: () => void;
}) => (
	<Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
		<SpaceBetween size="xxs">
			<div>
				<b>No matches</b>
				<Box variant="p" color="inherit">
					{"We can't find a match."}
				</Box>
			</div>
			<Button onClick={handleClearFilter}>Clear filter</Button>
		</SpaceBetween>
	</Box>
);

export const TableEmptyState = ({ resource }: { resource: string }) => (
	<Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
		<SpaceBetween size="xxs">
			<div>
				<b>No {resource.toLowerCase()}s</b>
				<Box variant="p" color="inherit">
					No {resource.toLowerCase()}s associated with this resource.
				</Box>
			</div>
			<Button>Create {resource.toLowerCase()}</Button>
		</SpaceBetween>
	</Box>
);
