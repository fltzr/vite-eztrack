/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { client } from '@/common/api/pocketbase-client';
import { addNotification } from '@/features/layout/state/slice';

export type TodoItem = {
	id?: string;
	user?: string;
	title?: string;
	description?: string;
	dueDate?: string;
	completed?: boolean;
};

export type TodoState = {
	todos: TodoItem[];
	loading: boolean;
	error?: string;
};

const initialState: TodoState = {
	todos: [],
	loading: false,
};

const unauthenticatedMessage = 'Not authenticated.';
const isAuthenticated = () => {
	const user = client.authStore.model;

	return (
		client.authStore.isValid &&
		client.authStore.isAuthRecord &&
		user &&
		user.id !== null
	);
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
	const user = client.authStore.model;

	if (!isAuthenticated()) {
		throw new Error(unauthenticatedMessage);
	}

	const response = await client
		.collection('todos')
		.getList<TodoItem>(1, 50, { filter: `user = "${user?.id}"` });

	return response.items;
});

export const addTodo = createAsyncThunk(
	'todo/addTodo',
	async (todo: TodoItem, { dispatch }) => {
		const user = client.authStore.model;

		if (!isAuthenticated()) {
			throw new Error(unauthenticatedMessage);
		}

		try {
			const response = await client.collection('todos').create<TodoItem>({
				...todo,
				user: user?.id,
			});

			return response;
		} catch (error) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'error',
					content: 'Failed to add task.',
				}),
			);
		}
	},
);

export const updateTodo = createAsyncThunk(
	'todo/updateTodo',
	async (todo: TodoItem, { dispatch }) => {
		if (!isAuthenticated()) {
			throw new Error(unauthenticatedMessage);
		}

		try {
			const response = await client
				.collection('todos')
				.update<TodoItem>(todo.id!, todo);

			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'info',
					content: 'Successfully updated task!',
				}),
			);

			return response;
		} catch (error) {
			dispatch(
				addNotification({
					id: `notification-${Date.now()}`,
					type: 'error',
					content: 'Failed to update task.',
				}),
			);
		}
	},
);

export const deleteTodo = createAsyncThunk(
	'todo/deleteTodo',
	async (id: string, { dispatch }) => {
		isAuthenticated();

		await client.collection('todos').delete(id);

		dispatch(
			addNotification({
				id: `notification-${Date.now()}`,
				type: 'info',
				content: 'Successfully deleted task.',
			}),
		);

		return id;
	},
);

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.loading = false;
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addTodo.fulfilled, (state, action: PayloadAction<TodoItem>) => {
				state.todos.push(action.payload);
			})
			.addCase(updateTodo.fulfilled, (state, action: PayloadAction<TodoItem>) => {
				const index = state.todos.findIndex(
					(todo) => todo.id === action.payload.id,
				);

				if (index !== -1) {
					state.todos[index] = action.payload;
				}
			})
			.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
				state.todos = state.todos.filter((todo) => todo.id !== action.payload);
			});
	},
});

export const todoReducer = todoSlice.reducer;
