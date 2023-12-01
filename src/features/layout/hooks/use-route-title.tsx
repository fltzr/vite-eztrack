import { useTypedMatches } from '@/common/hooks/use-typed-matches';
import { useAppDispatch } from '@/common/hooks';
import { setDomainTitle } from '../state/slice';

export const useRouteTitle = () => {
	const dispatch = useAppDispatch();
	const matches = useTypedMatches();

	if (matches[1]?.handle) {
		const { title } = matches[1].handle;

		if (title) {
			dispatch(setDomainTitle(title()));
		} else {
			dispatch(setDomainTitle(''));
		}
	}
};
