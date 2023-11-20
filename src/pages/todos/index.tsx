import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import { selectTodos, selectTodosLoading } from '@/features/todos/selectors';
import { deleteTodo, fetchTodos } from '@/features/todos/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { AddTodo } from './components/add-todo';
import { ListTodos } from './components/list-todos';

export const Component = () => (
	<SpaceBetween size="m">
		<ListTodos />
		<AddTodo />
	</SpaceBetween>
);
