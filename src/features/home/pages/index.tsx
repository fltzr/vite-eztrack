import { useEffect } from 'react';
import { PageLayout } from '@/common/layouts/page-layout';
import { setNavigationHidden, setNavigationOpen } from '@/features/layout/state/slice';
import { useAppDispatch } from '@/common/hooks';

export const Component = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setNavigationHidden(false));
		dispatch(setNavigationOpen(false));
	});

	return <PageLayout title="Welcome!"></PageLayout>;
};
