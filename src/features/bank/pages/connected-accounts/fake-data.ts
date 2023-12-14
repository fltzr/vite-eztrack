import { uniqueId } from 'lodash-es';
import type { ConnectedAccounts } from './table-config';

const idPrefix = 'plaid-item-';

export const items: ConnectedAccounts[] = [
	{
		id: '0001',
		institution: 'Apple FCU',
		connectionDate: '2023/11/12',
		itemId: uniqueId(idPrefix),
	},
	{
		id: '0002',
		institution: 'Bank of America',
		connectionDate: '2023/10/01',
		itemId: uniqueId(idPrefix),
	},
	{
		id: '0003',
		institution: 'RBFCU',
		connectionDate: '2022/01/01',
		itemId: uniqueId(idPrefix),
	},
];
