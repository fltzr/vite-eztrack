import StatusIndicator from '@cloudscape-design/components/status-indicator';
import type { TableColumnDefinition } from '@/common/utils/table-utils';

export type TodoItem = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export const todoItemColumnDefinitions: TableColumnDefinition<TodoItem>[] = [
	{
		id: 'userId',
		sortingField: 'userId',
		header: 'User ID',
		cell: (item) => item.userId,
		width: 20,
	},
	{
		id: 'id',
		sortingField: 'id',
		header: 'ID',
		cell: (item) => item.id,
		width: 20,
	},
	{
		id: 'title',
		sortingField: 'title',
		header: 'Title',
		cell: (item) => item.title,
		width: 80,
	},
	{
		id: 'completed',
		sortingField: 'completed',
		header: 'Completed',
		cell: ({ completed }) => (
			<StatusIndicator type={completed ? 'success' : 'in-progress'}>
				{completed ? 'Completed' : 'In Progress'}
			</StatusIndicator>
		),
		width: 80,
	},
];
