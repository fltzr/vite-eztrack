import { useEffect, useState } from 'react';
import axios from 'axios';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { ReusableTable } from '@/common/layouts/table';
import { todoItemColumnDefinitions, type TodoItem } from './config';

const fakeWait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const DemoTableTodos = () => {
	const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
	const [loadingTodoItems, setLoadingTodoItems] = useState(false);

	useEffect(() => {
		const fetchTodoItems = async () => {
			const { data } = await axios.get<TodoItem[]>(
				'https://jsonplaceholder.typicode.com/todos',
			);

			await fakeWait(9000);

			return data;
		};

		setLoadingTodoItems(true);
		fetchTodoItems()
			.then((data) => {
				setTodoItems(data);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoadingTodoItems(false);
			});
	}, []);

	return (
		<SpaceBetween size="xl">
			<ReusableTable
				localstorageKeyPrefix="DemoTodo"
				resource="Todo"
				columnDefinitions={todoItemColumnDefinitions}
				items={todoItems}
				loading={loadingTodoItems}
				loadingText="Loading todo items..."
				selectionType="multi"
			/>
		</SpaceBetween>
	);
};
