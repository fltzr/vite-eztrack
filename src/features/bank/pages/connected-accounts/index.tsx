import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import { Link } from '../../components/link';
import { items } from './fake-data';
import { columnDefinition } from './table-config';

export const Component = () => (
	<Table
		variant="container"
		columnDefinitions={columnDefinition}
		items={items}
		header={
			<Header
				variant="awsui-h1-sticky"
				actions={
					<SpaceBetween size="s" direction="horizontal">
						<Button variant="icon" iconName="refresh" />
						<Link />
					</SpaceBetween>
				}
			>
				Connected Accounts
			</Header>
		}
	/>
);
