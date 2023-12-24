import type { TableColumnDefinition } from '@/common/utils/table-utils';
import type { InferredBudgetItemSchema } from '../../types';

export const budgetItemColumnDefinition: TableColumnDefinition<InferredBudgetItemSchema>[] =
	[
		{
			id: 'id',
			sortingField: 'id',
			header: 'ID',
			cell: (item) => item.id,
			width: 260,
		},
		{
			id: 'title',
			sortingField: 'title',
			header: 'Title',
			cell: (item) => item.title,
			width: 120,
		},
		{
			id: 'value',
			sortingField: 'value',
			header: 'Value',
			cell: (item) => item.value,
			width: 120,
		},
		{
			id: 'category',
			sortingField: 'category',
			header: 'Catagory',
			cell: (item) => item.category,
			width: 120,
		},
	];
