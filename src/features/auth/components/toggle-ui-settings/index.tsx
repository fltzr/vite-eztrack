import { Density, Mode } from '@cloudscape-design/global-styles';
import Button from '@cloudscape-design/components/button';
import SpaceBetween from '@cloudscape-design/components/space-between';
import styles from './styles.module.scss';
import { selectDensity, selectTheme } from '@/features/layout/state/selectors';
import { setDensity, setTheme } from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';


export const ToggleUiSettings = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector(selectTheme);
	const density = useAppSelector(selectDensity);

	return (
		<div className={styles.container}>
			<SpaceBetween size="s" direction="horizontal">
				<Button
					variant="icon"
					iconName={theme === Mode.Light ? 'thumbs-up' : 'thumbs-down'}
					onClick={() => {
						dispatch(setTheme(theme === Mode.Light ? Mode.Dark : Mode.Light));
					}}
				/>
				<Button
					variant="icon"
					iconName={
						density === Density.Comfortable
							? 'thumbs-up-filled'
							: 'thumbs-down-filled'
					}
					onClick={() => {
						dispatch(
							setDensity(
								density === Density.Comfortable
									? Density.Compact
									: Density.Comfortable,
							),
						);
					}}
				/>
			</SpaceBetween>
		</div>
	);
};
