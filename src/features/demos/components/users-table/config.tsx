import type { TableColumnDefinition } from '@/common/utils/table-utils';

export type Users = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
};

export const usersColumnDefinitions: TableColumnDefinition<Users>[] = [
	{
		id: 'id',
		sortingField: 'id',
		header: 'ID',
		cell: (item) => item.id,
		width: 100,
	},
	{
		id: 'name',
		sortingField: 'name',
		header: 'Name',
		cell: (item) => item.name,
		width: 100,
	},
	{
		id: 'username',
		sortingField: 'username',
		header: 'Username',
		cell: (item) => item.username,
		width: 100,
	},
	{
		id: 'email',
		sortingField: 'email',
		header: 'Email',
		cell: (item) => item.email,
		width: 100,
	},
	{
		id: 'address',
		sortingField: 'address',
		header: 'Address',
		cell: (item) => (
			<>
				{item.address.street}, {item.address.suite}, {item.address.city},{' '}
				{item.address.zipcode}
			</>
		),
		width: 140,
	},
	{
		id: 'phone',
		sortingField: 'phone',
		header: 'Phone',
		cell: (item) => item.phone,
		width: 100,
	},
	{
		id: 'website',
		sortingField: 'website',
		header: 'Website',
		cell: (item) => item.website,
		width: 100,
	},
	{
		id: 'company',
		sortingField: 'company',
		header: 'Company',
		cell: (item) => (
			<>
				{item.company.name}, {item.company.catchPhrase}, {item.company.bs}
			</>
		),
		width: 100,
	},
];
