import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/common/hooks/use-app-dispatch';
import { useTypedMatches } from '@/common/hooks/use-typed-matches';
import { setBreadcrumbs } from '../state/slice';

export const useBreadcrumbs = () => {
	const dispatch = useAppDispatch();
	const matches = useTypedMatches();
	const homeCrumb = useMemo(
		() => ({
			text: 'Home',
			href: '/',
		}),
		[],
	);

	const crumbs = useMemo(
		() =>
			matches
				.filter((match) => Boolean(match.handle?.title?.()))
				.map((match) => ({
					text: match.handle?.title?.() ?? '',
					href: match.pathname,
				})),
		[matches],
	);

	useEffect(() => {
		dispatch(setBreadcrumbs([homeCrumb, ...crumbs]));
	}, [crumbs, dispatch, homeCrumb]);
};
