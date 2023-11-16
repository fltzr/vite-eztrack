import { useAppDispatch, useAppSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { selectActiveHref } from '../selectors';
import { setActiveHref } from '../slice';

export const useActiveHref = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const activeHref = useAppSelector(selectActiveHref);

    useEffect(() => {
        if (location.pathname !== activeHref) {
            dispatch(setActiveHref(location.pathname));
        }
    }, [location, dispatch]);
};
