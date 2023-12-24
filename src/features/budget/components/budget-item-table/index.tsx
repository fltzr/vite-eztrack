import { ReusableTable } from '@/common/layouts/table';
import type { InferredBudgetItemSchema } from '../../types';
import { budgetItemColumnDefinition } from './config';

// const DeleteBudgetItemButton = ({ itemId, handleDeleteBudgetItem }: { itemId: string, handleDeleteBudgetItem: (itemId: string) => void }) => (
//     <Button variant='icon' iconName='delete-marker' onClick={() => { handleDeleteBudgetItem(itemId); }}>Delete</Button>
// );

type BudgetItemTableProps = {
	budgetItems: InferredBudgetItemSchema[];
	handleDeleteBudgetItem: (id: string) => void;
};

export const BudgetItemTable = ({ budgetItems }: BudgetItemTableProps) => (
	<ReusableTable
		variant="container"
		localstorageKeyPrefix="Budget-Item"
		resource="Budget item"
		columnDefinitions={budgetItemColumnDefinition}
		items={budgetItems}
		selectionType="multi"
		onDeleteClick={() => {
			console.log('[BudgetItemTable] onDeleteClick()');
		}}
	/>
);
