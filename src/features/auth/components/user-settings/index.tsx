import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { KeyValuePair } from '@/common/components/key-value-pair';
import { useAppSelector } from '@/common/hooks';
import { selectUser } from '../../state/selectors';

export const UserSettings = () => {
	const user = useAppSelector(selectUser);

	return (
		<ColumnLayout columns={2} variant="text-grid">
			<SpaceBetween size="l">
				<KeyValuePair label="Username">{user?.username}</KeyValuePair>
				<KeyValuePair label="Email">{user?.email}</KeyValuePair>
			</SpaceBetween>
			<SpaceBetween size="l">
				<KeyValuePair label="Full name">
					{user?.firstname} {user?.lastname}
				</KeyValuePair>
				<KeyValuePair label="Birthday">
					{(user?.birthdate as string).split(' ')[0]}
				</KeyValuePair>
			</SpaceBetween>
		</ColumnLayout>
	);
};
