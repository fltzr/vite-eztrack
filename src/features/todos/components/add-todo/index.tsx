import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormFileUpload } from '@/common/components/form/file-upload';
import { FormInput } from '@/common/components/form/input';
import { FormTextarea } from '@/common/components/form/text-area';
import { addNotification } from '@/features/layout/state/slice';
import { addTodo } from '@/features/todos/state/slice';
import { useAppDispatch } from '@/common/hooks';

const todoSchema = z.object({
	title: z.string().min(1, 'Title is required.'),
	description: z.string().optional(),
	dueDate: z.string().optional(),
	documents: z.array(z.instanceof(File)).optional(),
});

type InferredTodoSchema = z.infer<typeof todoSchema>;

type AddTodoProps = {
	isVisible: boolean;
	setIsVisible: () => void;
};

export const AddTodo = ({ isVisible, setIsVisible }: AddTodoProps) => {
	const dispatch = useAppDispatch();
	const methods = useForm<InferredTodoSchema>({
		resolver: zodResolver(todoSchema),
	});

	const handleAddTodo = async (data: Partial<InferredTodoSchema>) => {
		try {
			await dispatch(addTodo(data));
			methods.reset();
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
									<FormInput<InferredTodoSchema>
										spellcheck
										name="title"
										label="Title *"
										autoComplete={false}
									/>
									<FormTextarea<InferredTodoSchema>
										spellcheck
										name="description"
										label="Description"
									/>
									<FormDatePicker<InferredTodoSchema>
										name="dueDate"
										label="Due date"
										placeholder="YYYY/MM/DD"
									/>
									<FormFileUpload<InferredTodoSchema>
										name="documents"
										accept="application/pdf text/csv text/plain"
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
