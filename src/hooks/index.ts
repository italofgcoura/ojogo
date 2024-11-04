import { useDispatch, useSelector, useStore } from 'react-redux';
import type { tAppDispatch, tRootState, tStore } from '../redux/store';

export const useAppDispatch = useDispatch.withTypes<tAppDispatch>();
export const useAppSelector = useSelector.withTypes<tRootState>();
export const useAppStore = useStore.withTypes<tStore>();
