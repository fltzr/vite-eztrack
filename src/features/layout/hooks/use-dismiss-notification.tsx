import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { removeAllNotifications } from '../state/slice';
import { useAppDispatch } from '@/common/hooks';

export const useDismissNotifications = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	useEffect(
		() => () => {
			dispatch(removeAllNotifications());
		},
		[dispatch, location.pathname],
	);
};
