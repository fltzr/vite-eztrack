import { Navigate } from 'react-router-dom';
import { load } from '@/common/utils';

export const Component = () => {
	const token = load('auth');

	if (!token) {
		return <Navigate replace to="/auth/signin" />;
	}
	console.log('Token found, send to app');

	return <Navigate replace to="/" />;
};
