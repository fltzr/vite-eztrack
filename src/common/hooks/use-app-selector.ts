import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '@/common/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
