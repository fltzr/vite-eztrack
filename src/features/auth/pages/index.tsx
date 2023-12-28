import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../state/selectors';
import { useAppSelector } from '@/common/hooks';
import { Shell } from '@/features/layout/components/shell';

export const Component = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	return <>{isAuthenticated ? <Shell /> : <Navigate replace to="/" />}</>;
};
