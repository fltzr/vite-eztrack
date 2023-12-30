import { Navigate } from 'react-router-dom';
import { Shell } from '@/features/layout/components/shell';
import { useAppSelector } from '@/common/hooks';
import { selectIsAuthenticated } from '../state/selectors';

export const Component = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	return <>{isAuthenticated ? <Shell /> : <Navigate replace to="/auth" />}</>;
};
