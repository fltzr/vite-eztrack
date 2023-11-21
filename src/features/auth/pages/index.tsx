import { Navigate } from 'react-router-dom';
import { load } from '@/common/utils';

export const Auth = () => {
	const token = load('auth');

	if (!token) {
		console.log('No token, send to signin');

		return <Navigate replace to="/auth/signin" />;
	}
	console.log('Token found, send to app');

	return <Navigate replace to="/" />;
};
