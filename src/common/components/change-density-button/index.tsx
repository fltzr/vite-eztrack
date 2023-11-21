import { Density } from '@cloudscape-design/global-styles';
import Button from '@cloudscape-design/components/button';
import { selectDensity } from '@/features/layout/state/selectors';
import { setDensity } from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';

export const ChangeDensityButton = () => {
	const dispatch = useAppDispatch();
	const density = useAppSelector(selectDensity);

	return (
		<Button
			variant="primary"
			iconName={
				density === Density.Comfortable ? 'status-positive' : 'status-negative'
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
		>
			Density
		</Button>
	);
};
