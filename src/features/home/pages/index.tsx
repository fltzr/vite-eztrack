import { useEffect } from 'react';
import { setNavigationHidden, setNavigationOpen } from '@/features/layout/state/slice';
import { useAppDispatch } from '@/common/hooks';

export const Component = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setNavigationHidden(false));
		dispatch(setNavigationOpen(true));
	});

	return <>Home</>;
};
