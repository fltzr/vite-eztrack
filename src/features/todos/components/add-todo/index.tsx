import { FormProvider, useForm } from 'react-hook-form';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormInput } from '@/common/components/form/input';
import { FormTextarea } from '@/common/components/form/text-area';
import { addNotification } from '@/features/layout/state/slice';
import { type TodoItem, addTodo } from '@/features/todos/state/slice';
import { useAppDispatch } from '@/common/hooks';

type AddTodoProps = {
	isVisible: boolean;
	setIsVisible: () => void;
};

export const AddTodo = ({ isVisible, setIsVisible }: AddTodoProps) => {
	const dispatch = useAppDispatch();
	const methods = useForm<TodoItem>();

	const handleAddTodo = async (data: Partial<TodoItem>) => {
		try {
			await dispatch(addTodo(data));
			methods.reset();
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'success',
					content: 'Successfully added task!',
				}),
			);
		} catch (error) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'error',
					content: 'Failed to add task. Please try again later.',
				}),
			);
		}

		setIsVisible();
	};

	return (
		<Modal
			size="medium"
			visible={isVisible}
			header={<Header variant="h2">Add todo</Header>}
			onDismiss={setIsVisible}
		>
			<Box margin={{ bottom: 'l' }}>
				<Form
					actions={
						<Button
							variant="primary"
							form="add-todo-form"
							formAction="submit"
						>
							Add todo
						</Button>
					}
				>
					<FormProvider {...methods}>
						<SpaceBetween size="l" direction="vertical">
							<form
								id="add-todo-form"
								onSubmit={(event) => {
									void methods.handleSubmit(handleAddTodo)(event);
								}}
							>
								<SpaceBetween size="m">
									<FormInput<TodoItem>
										spellcheck
										name="title"
										label="Title *"
										autoComplete={false}
									/>
									<FormTextarea<TodoItem>
										spellcheck
										name="description"
										label="Description"
									/>
									<FormDatePicker<TodoItem>
										name="dueDate"
										label="Due date"
										placeholder="YYYY/MM/DD"
									/>
								</SpaceBetween>
							</form>
						</SpaceBetween>
					</FormProvider>
				</Form>
			</Box>
		</Modal>
	);
};
