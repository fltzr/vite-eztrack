import { FormProvider, useForm } from 'react-hook-form';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormInput } from '@/common/components/form/input';
import { type TodoItem, addTodo, fetchTodos } from '@/features/todos/slice';
import { useAppDispatch } from '@/common/hooks';

export const AddTodo = () => {
	const dispatch = useAppDispatch();
	const methods = useForm<TodoItem>();

	const handleAddTodo = async (data: Partial<TodoItem>) => {
		try {
			await dispatch(addTodo(data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container header="Add Todo">
			<FormProvider {...methods}>
				<SpaceBetween size="l" direction="vertical">
					<form
						id="add-todo-form"
						onSubmit={(event) => {
							void methods.handleSubmit(handleAddTodo)(event);
							void dispatch(fetchTodos());
						}}
					>
						<SpaceBetween size="m">
							<FormInput<TodoItem> name="title" placeholder="Title" />
							<FormInput<TodoItem>
								name="description"
								placeholder="Description"
							/>
							<FormDatePicker<TodoItem>
								name="dueDate"
								placeholder="YYYY/MM/DD"
							/>
						</SpaceBetween>
					</form>
					<Button variant="primary" form="add-todo-form" formAction="submit">
						Add todo
					</Button>
				</SpaceBetween>
			</FormProvider>
		</Container>
	);
};
