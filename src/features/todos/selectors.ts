import type { AppState } from '@/common/store';

export const selectTodos = (state: AppState) => state.todos.todos;
export const selectTodosLoading = (state: AppState) => state.todos.loading;
export const selectTodosError = (state: AppState) => state.todos.error;
