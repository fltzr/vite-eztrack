import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { useAppDispatch } from '@/common/hooks/use-app-dispatch';
import { useTypedMatches } from '@/common/hooks/use-typed-matches';
import { setBreadcrumbs } from '../state/slice';

export const useBreadcrumbs = () => {
	const dispatch = useAppDispatch();
	const matches = useTypedMatches();
	const homeCrumb: BreadcrumbGroupProps.Item = { text: 'Home', href: '/' };

	const crumbs: BreadcrumbGroupProps.Item[] = matches
		.filter((match) => Boolean(match.handle?.title?.()))
		.map((match) => ({
			text: match.handle?.title?.() ?? '',
			href: match.pathname,
		}));

	dispatch(setBreadcrumbs([homeCrumb, ...crumbs]));
};
