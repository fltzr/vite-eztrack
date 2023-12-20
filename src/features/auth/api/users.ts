import axios from 'axios';
import type { User } from '@/common/types/user';

export const createUser = async (user: User) => {
	const response = await axios.post<User>(
		`${import.meta.env.VITE_API_URI}/signup`,
		user,
	);

	return response.data;
};

export const signinUser = async (user: Pick<User, 'username' | 'password'>) => {
	const response = await axios.post<Partial<User>>(
		`${import.meta.env.VITE_API_URI}/login`,
		user,
	);

	return response.data;
};
