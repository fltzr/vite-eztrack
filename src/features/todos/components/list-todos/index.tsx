// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable react/no-unstable-nested-components */
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import Box from '@cloudscape-design/components/box';
// import Button from '@cloudscape-design/components/button';
// import ButtonDropdown from '@cloudscape-design/components/button-dropdown';
// import Cards, { type CardsProps } from '@cloudscape-design/components/cards';
// import Header from '@cloudscape-design/components/header';
// import Icon from '@cloudscape-design/components/icon';
// import TextFilter from '@cloudscape-design/components/text-filter';
// import { ConfirmDeleteModal } from '@/common/components/confirm-delete';
// import { useAppDispatch, useAppSelector } from '@/common/hooks';
// import { AddTodo } from '../add-todo';

// export const ListTodos = () => {
// 	const dispatch = useAppDispatch();
// 	const todos = useAppSelector(selectTodos);
// 	const loadingTodos = useAppSelector(selectTodosLoading);

// 	const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
// 	const [deleteTodoModalVisible, setDeleteTodoModalVisible] = useState(false);
// 	const [markTodoId, setMarkTodoId] = useState('');

// 	useEffect(() => {
// 		void dispatch(fetchTodos());
// 	}, [dispatch]);

// 	const handleDeleteTodoModal = useCallback((todoId: string) => {
// 		setMarkTodoId(todoId);
// 		setDeleteTodoModalVisible(true);
// 	}, []);

// 	const handleDeleteTodo = useCallback(() => {
// 		void dispatch(deleteTodo(markTodoId));
// 		setDeleteTodoModalVisible(false);
// 		setMarkTodoId('');
// 	}, [markTodoId, dispatch]);

// 	const renderCardHeader = useCallback(
// 		(item: TodoItem) => (
// 			<Header
// 				variant="h3"
// 				description={item.description}
// 				info={
// 					<ButtonDropdown
// 						variant="inline-icon"
// 						items={[
// 							{
// 								id: 'todo-completion-status',
// 								text: `${
// 									item.completed ? 'Mark in progress' : 'Mark completed'
// 								}`,
// 							},
// 							{
// 								id: 'todo-delete',
// 								text: 'Delete todo',
// 							},
// 						]}
// 						onItemClick={(event) => {
// 							const { id } = event.detail;

// 							event.preventDefault();

// 							if (id === 'todo-completion-status') {
// 								void dispatch(
// 									updateTodo({ ...item, completed: !item.completed }),
// 								);
// 							} else if (id === 'todo-delete') {
// 								handleDeleteTodoModal(item.id!);
// 							}
// 						}}
// 					/>
// 				}
// 				actions={
// 					<Icon
// 						variant={item.completed ? 'success' : 'link'}
// 						name={item.completed ? 'status-positive' : 'status-in-progress'}
// 					/>
// 				}
// 			>
// 				{item.title}
// 			</Header>
// 		),
// 		[handleDeleteTodoModal, dispatch],
// 	);

// 	const renderCardContent = useCallback(
// 		(item: TodoItem) => (
// 			<Box variant="span" margin={{ top: 'xl' }}>
// 				{item.dueDate}
// 			</Box>
// 		),
// 		[],
// 	);

// 	const cardDefinition = useMemo(
// 		(): CardsProps.CardDefinition<TodoItem> => ({
// 			header: renderCardHeader,
// 			sections: [{ content: renderCardContent }],
// 		}),
// 		[renderCardHeader, renderCardContent],
// 	);

// 	return (
// 		<>
// 			<Cards<TodoItem>
// 				cardDefinition={cardDefinition}
// 				items={todos}
// 				trackBy="id"
// 				loading={loadingTodos}
// 				loadingText="Fetching Todos..."
// 				cardsPerRow={[{ cards: 3 }]}
// 				filter={
// 					<TextFilter
// 						filteringPlaceholder="Filter todo items"
// 						filteringText={''}
// 					/>
// 				}
// 				empty={
// 					loadingTodos ? null : <Box variant="span">{"Let's add a task!"}</Box>
// 				}
// 				header={
// 					<Header
// 						actions={
// 							<Button
// 								variant="icon"
// 								iconName="add-plus"
// 								onClick={() => {
// 									setAddTodoModalVisible(true);
// 								}}
// 							/>
// 						}
// 					>
// 						Todos
// 					</Header>
// 				}
// 			/>

// 			<AddTodo
// 				isVisible={addTodoModalVisible}
// 				setIsVisible={() => {
// 					setAddTodoModalVisible(false);
// 				}}
// 			/>

// 			<ConfirmDeleteModal
// 				resource="todo"
// 				quantity={1}
// 				visible={deleteTodoModalVisible}
// 				confirmDelete={handleDeleteTodo}
// 				onDismiss={() => {
// 					setDeleteTodoModalVisible(false);
// 				}}
// 			/>
// 		</>
// 	);
// };
