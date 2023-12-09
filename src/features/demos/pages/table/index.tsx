import SpaceBetween from '@cloudscape-design/components/space-between';
import { DemoTableProducts } from '../../components/products-table';
import { DemoTableTodos } from '../../components/todos-table';
import { DemoTableUser } from '../../components/users-table';

export const Component = () => (
	<SpaceBetween size="xl">
		<DemoTableTodos />
		<DemoTableProducts />
		<DemoTableUser />
	</SpaceBetween>
);
