import { useEffect } from 'react';
import { useTypedMatches } from '@/common/hooks/use-typed-matches';
import { useAppDispatch } from '@/common/hooks';
import { setDomainTitle } from '../state/slice';

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
