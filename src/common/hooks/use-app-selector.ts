import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import type { AppState } from '@/common/store';

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
