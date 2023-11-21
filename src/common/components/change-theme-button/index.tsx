import { Mode } from '@cloudscape-design/global-styles';
import Button from '@cloudscape-design/components/button';
import { selectTheme } from '@/features/layout/state/selectors';
import { setTheme } from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';

export const ChangeThemeButton = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(selectTheme);

	return (
		<Button
			variant="primary"
			iconName={theme === Mode.Light ? 'status-positive' : 'status-negative'}
			onClick={() => {
				dispatch(setTheme(theme === Mode.Light ? Mode.Dark : Mode.Light));
			}}
		>
			Theme
		</Button>
	);
};
