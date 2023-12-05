import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { client } from '@/common/api/pocketbase-client';
import { KeyValuePair } from '@/common/components/key-value-pair';

export const UserSettings = () => {
	const user = client.authStore.model;

	return (
		<ColumnLayout columns={2} variant="text-grid">
			<SpaceBetween size="l">
				<KeyValuePair label="Account id">{user?.id}</KeyValuePair>
				<KeyValuePair label="Username">{user?.username}</KeyValuePair>
				<KeyValuePair label="Email">{user?.email}</KeyValuePair>
			</SpaceBetween>
			<SpaceBetween size="l">
				<KeyValuePair label="Full name">
					{user?.firstname} {user?.lastname}
				</KeyValuePair>
				<KeyValuePair label="Birthday">
					{(user?.birthday as string).split(' ')[0]}
				</KeyValuePair>
			</SpaceBetween>
		</ColumnLayout>
	);
};
