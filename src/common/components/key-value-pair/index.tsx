import type { PropsWithChildren } from 'react';
import Box from '@cloudscape-design/components/box';

type KeyValuePairProps = PropsWithChildren & {
	label: string;
};
export const KeyValuePair = ({ ...props }: KeyValuePairProps) => (
	<>
		<Box variant="awsui-key-label">{props.label}</Box>
		<div>{props.children}</div>
	</>
);
