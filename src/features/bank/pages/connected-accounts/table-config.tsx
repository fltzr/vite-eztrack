import Box from '@cloudscape-design/components/box';

// import type { TableProps } from '@cloudscape-design/components/table';

export type ConnectedAccounts = {
	id: string;
	institution: string;
	connectionDate: string;
	itemId: string;
};

export const columnDefinition = [
	{
		id: 'id',
		sortingField: 'id',
		header: 'Account ID',
		cell: (item: ConnectedAccounts) => <Box variant="span">{item.id}</Box>,
	},
	{
		id: 'institution',
		sortingField: 'institution',
		header: 'Institution',
		cell: (item: ConnectedAccounts) => <Box variant="span">{item.institution}</Box>,
	},
	{
		id: 'connection-date',
		sortingField: 'connection-date',
		header: 'Connection Date',
		cell: (item: ConnectedAccounts) => (
			<Box variant="span">{item.connectionDate}</Box>
		),
	},
	{
		id: 'item-id',
		sortingField: 'item-id',
		header: 'Item Id',
		cell: (item: ConnectedAccounts) => <Box variant="span">{item.itemId}</Box>,
	},
];
