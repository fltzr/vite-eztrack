import { useEffect } from 'react';
import { setDomainTitle } from '../state/slice';
import { useTypedMatches } from '@/common/hooks/use-typed-matches';
import { useAppDispatch } from '@/common/hooks';

export const useRouteTitle = () => {
	const dispatch = useAppDispatch();
	const matches = useTypedMatches();

	useEffect(() => {
		if (!matches[1].handle) {
			return;
		}

		const { title } = matches[1].handle;

		dispatch(setDomainTitle(title ? title() : ''));
	}, [matches, dispatch]);
};
