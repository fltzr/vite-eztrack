import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '@/common/hooks';
import { removeAllNotifications } from '../state/slice';

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
