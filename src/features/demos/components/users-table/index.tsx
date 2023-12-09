import { useEffect, useState } from 'react';
import axios from 'axios';
import { ReusableTable } from '@/common/layouts/table';
import { usersColumnDefinitions, type Users } from './config';

const fakeWait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const DemoTableUser = () => {
	const [users, setUsers] = useState<Users[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get<Users[]>(
				'https://jsonplaceholder.typicode.com/users',
			);

			await fakeWait(5000);

			return data;
		};

		setLoadingUsers(true);
		fetchUsers()
			.then((data) => {
				setUsers(data);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoadingUsers(false);
			});
	}, []);

	return (
		<ReusableTable
			localstorageKeyPrefix="DemoUsers"
			resource="user"
			columnDefinitions={usersColumnDefinitions}
			items={users}
			loading={loadingUsers}
			loadingText="Loading todo items..."
			selectionType="multi"
		/>
	);
};
