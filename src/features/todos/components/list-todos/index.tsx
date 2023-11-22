/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Cards from '@cloudscape-design/components/cards';
import Header from '@cloudscape-design/components/header';
import { selectTodos, selectTodosLoading } from '@/features/todos/state/selectors';
import {
	deleteTodo,
	fetchTodos,
	updateTodo,
	type TodoItem,
} from '@/features/todos/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { AddTodo } from '../add-todo';

export const ListTodos = () => {
	const dispatch = useAppDispatch();
	const todos = useAppSelector(selectTodos);
	const loadingTodos = useAppSelector(selectTodosLoading);

	const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);

	useEffect(() => {
		void dispatch(fetchTodos());
	}, [dispatch]);

	const cardDefinition = {
		header: (item: TodoItem) => (
			<Header
				variant="h3"
				description={item.description}
				info={
					<Button
						variant="icon"
						iconName={item.completed ? 'status-positive' : 'status-negative'}
						onClick={() => {
							void dispatch(
								updateTodo({ ...item, completed: !item.completed }),
							);
						}}
					/>
				}
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
					<Box variant="span" margin={{ top: 'xl' }}>
						{item.dueDate}
					</Box>
				),
			},
		],
	};

	return (
		<>
			<Cards<TodoItem>
				cardDefinition={cardDefinition}
				items={todos}
				trackBy="id"
				loading={loadingTodos}
				loadingText="Fetching Todos..."
				cardsPerRow={[{ cards: 3 }]}
				empty={
					loadingTodos ? null : <Box variant="span">{"Let's add a task!"}</Box>
				}
				header={
					<Header
						actions={
							<Button
								variant="icon"
								iconName="add-plus"
								onClick={() => {
									setAddTodoModalVisible(true);
								}}
							/>
						}
					>
						Todos
					</Header>
				}
			/>

			<AddTodo
				isVisible={addTodoModalVisible}
				setIsVisible={() => {
					setAddTodoModalVisible(false);
				}}
			/>
		</>
	);
};
