import { useState } from 'react';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { BudgetItemForm } from '../../components/budget-item-form';
import { BudgetItemTable } from '../../components/budget-item-table';
import { BudgetPieChart } from '../../components/budget-pie-chart';
import { IncomeForm } from '../../components/income-form';
import type { InferredIncomeSchema, InferredSubmitBudgetItemSchema } from '../../types';
import { useCreateBudgetItemMutation, useFetchBudgetItemsQuery } from '../../state/slice';
import { PageLayout } from '@/common/layouts/page-layout';
import { useAppDispatch } from '@/common/hooks';
import { addNotification } from '@/features/layout/state/slice';

export const Component = () => {
	const dispatch = useAppDispatch();

	const {
		data,
		isLoading: isLoadingFetchBudgetItems,
		error,
	} = useFetchBudgetItemsQuery();
	const [
		createBudgetItem,
		{ isLoading: isLoadingCreateBudgetItem, isSuccess, isError },
	] = useCreateBudgetItemMutation();
	const [totalIncome, setTotalIncome] = useState<number>(0);

	const handleSubmitBudgetItem = async (data: InferredSubmitBudgetItemSchema) => {
		try {
			await createBudgetItem({ item: data }).unwrap();
			dispatch(
				addNotification({
					autoDismiss: true,
					id: `notification-${Date.now()}`,
					type: 'success',
					header: 'Successfully created budget item.',
				}),
			);
		} catch (error) {
			dispatch(
				addNotification({
					autoDismiss: true,
					id: `notification-${Date.now()}`,
					type: 'error',
					header: 'Operation failed.',
					content: 'Unabled to add the budget item.',
				}),
			);
		}
	};

	const handleTotalIncome = (data: InferredIncomeSchema) => {
		setTotalIncome(parseFloat(data.income));
	};

	return (
		<PageLayout title="Budget">
			<SpaceBetween size="m" direction="vertical">
				<ColumnLayout columns={2} minColumnWidth={150}>
					<SpaceBetween size="m" direction="vertical">
						<BudgetItemForm onSubmitBudgetItem={handleSubmitBudgetItem} />
						<IncomeForm onSubmitIncome={handleTotalIncome} />
					</SpaceBetween>
					<BudgetPieChart
						statusType={isLoadingCreateBudgetItem ? 'loading' : 'finished'}
						budgetItems={data?.items ?? []}
						totalIncome={totalIncome}
					/>
				</ColumnLayout>
				<BudgetItemTable budgetItems={data?.items ?? []} />
			</SpaceBetween>
		</PageLayout>
	);
};
