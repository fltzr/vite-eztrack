import type { TableColumnDefinition } from '@/common/utils/table-utils';

export type Holiday = {
	name: string;
	date: string;
	observed: string;
	country: string;
	uuid: string;
	weekday: {
		date: {
			name: string;
			numeric: string;
		};
		observed: {
			name: string;
			numeric: string;
		};
	};
};

export type HolidayResponse = {
	status: number;
	warning: string;
	requests: {
		used: number;
		available: number;
		resets: string;
	};
	holidays: Holiday[];
};

export const holidayColumnDefinitions: TableColumnDefinition<Holiday>[] = [
	{
		id: 'name',
		sortingField: 'name',
		header: 'Name',
		cell: (item) => item.name,
		width: 260,
	},
	{
		id: 'date',
		sortingField: 'date',
		header: 'Date',
		cell: (item) => item.date,
		width: 120,
		isDateTime: true,
	},
	{
		id: 'observed',
		sortingField: 'observed',
		header: 'Observed',
		cell: (item) => item.observed,
		width: 120,
		isVisible: false,
		isDateTime: true,
	},
	{
		id: 'country',
		sortingField: 'country',
		header: 'Country',
		cell: (item) => item.country,
		width: 120,
		isVisible: false,
	},
	{
		id: 'uuid',
		sortingField: 'uuid',
		header: 'UUID',
		cell: (item) => item.uuid,
		width: 100,
		isVisible: false,
	},
];
