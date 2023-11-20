/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { selectTodos, selectTodosLoading } from '@/features/todos/selectors';
import { deleteTodo, fetchTodos, type TodoItem } from '@/features/todos/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';

export const ListTodos = () => {
	const dispatch = useAppDispatch();
	const todos = useAppSelector(selectTodos);
	const loadingTodos = useAppSelector(selectTodosLoading);

	useEffect(() => {
		dispatch(fetchTodos);
	}, [dispatch]);

	const cardDefinition = {
		header: (item: TodoItem) => (
			<Header
				variant="h3"
				actions={
					<Button
						variant="icon"
						iconName="delete-marker"
						onClick={() => {
							void dispatch(deleteTodo(item.id!));
						}}
					/>
				}
			>
				{item.title}
			</Header>
		),
		sections: [
			{
				content: (item: TodoItem) => (
					<SpaceBetween size="xs" direction="vertical">
						<SpaceBetween size="xxl" direction="horizontal">
							<div>
								<Box variant="awsui-key-label">Due date</Box>
								<Box variant="strong">{item.dueDate ?? '-'}</Box>
							</div>
						</SpaceBetween>
						<Box variant="awsui-key-label">Description</Box>
						<Box variant="awsui-key-label">
							{item.description?.length === 0 ? '-' : item.description}
						</Box>
					</SpaceBetween>
				),
			},
		],
	};

	return (
		<Cards<TodoItem>
			cardDefinition={cardDefinition}
			items={todos}
			trackBy="id"
			loading={loadingTodos}
			loadingText="Fetching Todos..."
			empty={loadingTodos ? null : <Box variant="span">Let&aposs add a task!</Box>}
			header={<Header>Todos</Header>}
		/>
	);
};
