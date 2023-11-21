/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { client } from '@/common/api/pocketbase-client';

export interface TodoItem {
	id?: string;
	user?: string;
	title?: string;
	description?: string;
	dueDate?: string;
	completed?: boolean;
}

export interface TodoState {
	todos: TodoItem[];
	loading: boolean;
	error?: string;
}

const initialState: TodoState = {
	todos: [],
	loading: false,
};

const isAuthenticated = () => {
	const user = client.authStore.model;

	if (
		!client.authStore.isValid ||
		!client.authStore.isAuthRecord ||
		!user ||
		user.id === null
	) {
		throw new Error('User not authenticated');
	}
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
	const user = client.authStore.model;

	isAuthenticated();

	const response = await client
		.collection('todos')
		.getList<TodoItem>(1, 50, { filter: `user = "${user?.id}"` });

	return response.items;
});

export const addTodo = createAsyncThunk('todo/addTodo', async (todo: TodoItem) => {
	const user = client.authStore.model;

	isAuthenticated();

	const response = await client.collection('todos').create<TodoItem>({
		...todo,
		user: user?.id,
	});

	return response;
});

export const updateTodo = createAsyncThunk('todo/updateTodo', async (todo: TodoItem) => {
	isAuthenticated();

	const response = await client.collection('todos').update<TodoItem>(todo.id!, todo);

	return response;
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id: string) => {
	isAuthenticated();

	await client.collection('todos').delete(id);

	return id;
});

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
