import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import PieChart, { type PieChartProps } from '@cloudscape-design/components/pie-chart';
import type { InferredBudgetItemSchema } from '../../types';

type BudgetPieChartProps = {
	statusType: PieChartProps['statusType'];
	budgetItems?: InferredBudgetItemSchema[];
	totalIncome: number;
};

export const BudgetPieChart = ({ ...props }: BudgetPieChartProps) => {
	const remainingBudget = props.budgetItems
		? props.totalIncome -
			props.budgetItems.reduce((prev, curr) => prev + curr.value, 0)
		: 0;

	return (
		<Container fitHeight variant="stacked">
			<PieChart
				fitHeight
				variant="donut"
				size="medium"
				data={props.budgetItems ?? []}
				innerMetricDescription={`($${remainingBudget} remaining)`}
				innerMetricValue={`$${props.totalIncome}`}
				segmentDescription={(datum) => `$${datum.value}`}
				ariaDescription="Donut chart showing generic example data."
				ariaLabel="Donut chart"
				detailPopoverContent={(segment, sum) => [
					{ key: 'Amount', value: `$${segment.value}` },
					{ key: 'Category', value: segment.category },
					{
						key: 'Percentage of income',
						value: `${((segment.value / props.totalIncome) * 100).toFixed(
							0,
						)}%`,
					},
					{
						key: 'Percentage of all expenses',
						value: `${((segment.value / sum) * 100).toFixed(0)}%`,
					},
				]}
				empty={
					<Box textAlign="center" color="inherit">
						<b>No data available</b>
						<Box variant="p" color="inherit">
							There is no data available
						</Box>
					</Box>
				}
				noMatch={
					<Box textAlign="center" color="inherit">
						<b>No matching data</b>
						<Box variant="p" color="inherit">
							There is no matching data to display
						</Box>
						<Button>Clear filter</Button>
					</Box>
				}
			/>
		</Container>
	);
};
