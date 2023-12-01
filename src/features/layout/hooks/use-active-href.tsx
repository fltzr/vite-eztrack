import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { selectActiveHref } from '../state/selectors';
import { setActiveHref } from '../state/slice';

export const useActiveHref = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const activeHref = useAppSelector(selectActiveHref);

	if (location.pathname !== activeHref) {
		dispatch(setActiveHref(location.pathname));
	}
};
