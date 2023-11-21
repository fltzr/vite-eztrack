import { useEffect } from 'react';
import { useMatches } from 'react-router-dom';
import { useAppDispatch } from '@/common/hooks';
import { setDomainTitle } from '../state/slice';

interface Handle {
	title: () => string;
}

export const useRouteTitle = () => {
	const dispatch = useAppDispatch();
	const matches = useMatches();

	useEffect(() => {
		if (matches[1]?.handle) {
			const handle = matches[1].handle as Handle;

			dispatch(setDomainTitle(handle.title()));
		} else {
			dispatch(setDomainTitle(''));
		}
	}, [matches, dispatch]);
};
