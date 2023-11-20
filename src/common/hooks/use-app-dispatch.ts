import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/common/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
