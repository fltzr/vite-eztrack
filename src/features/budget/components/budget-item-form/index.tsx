import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty } from 'lodash-es';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Form from '@cloudscape-design/components/form';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormInput } from '@/common/components/form/input';
import { FormSelect } from '@/common/components/form/select';
import {
	type InferredSubmitBudgetItemSchema,
	submitBudgetItemSchema,
} from '@/features/budget/types';

type BudgetItemFormProps = {
	onSubmitBudgetItem: (data: InferredSubmitBudgetItemSchema) => void;
};

export const BudgetItemForm = ({ ...props }: BudgetItemFormProps) => {
	const methods = useForm<InferredSubmitBudgetItemSchema>({
		resolver: zodResolver(submitBudgetItemSchema),
	});

	return (
		<Container
			fitHeight
			variant="stacked"
			header={<Header variant="h2">Add a budget item</Header>}
			footer={
				<Box float="right">
					<Button
						fullWidth
						formAction="submit"
						form="create-budget-item-form"
						variant="primary"
						disabled={!isEmpty(Object.keys(methods.formState.errors))}
					>
						Add budget item
					</Button>
				</Box>
			}
		>
			<FormProvider {...methods}>
				<Form variant="embedded">
					<form
						id="create-budget-item-form"
						onSubmit={(event) => {
							void methods.handleSubmit(props.onSubmitBudgetItem)(event);
						}}
					>
						<SpaceBetween size="m" direction="vertical">
							<FormInput<InferredSubmitBudgetItemSchema>
								ariaRequired
								name="title"
								label="Item name"
								autoComplete={false}
								clearAriaLabel="Clear"
							/>
							<FormInput<InferredSubmitBudgetItemSchema>
								ariaRequired
								disableBrowserAutocorrect
								autoComplete={false}
								name="value"
								label="Amount"
								type="number"
								inputMode="decimal"
								clearAriaLabel="Clear"
							/>
							<FormSelect<InferredSubmitBudgetItemSchema>
								name="category"
								label="Category"
								options={[
									{ label: 'Shopping', value: 'shopping' },
									{ label: 'Bills', value: 'bills' },
									{ label: 'Subscriptions', value: 'subscriptions' },
									{ label: 'Savings', value: 'loans' },
									{ label: 'Food', value: 'food' },
									{ label: 'Misc.', value: 'misc' },
								]}
							/>
						</SpaceBetween>
					</form>
				</Form>
			</FormProvider>
		</Container>
	);
};
