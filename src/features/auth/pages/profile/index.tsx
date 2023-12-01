import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { client } from '@/common/api/pocketbase-client';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormInput } from '@/common/components/form/input';
import { KeyValuePair } from '@/common/components/key-value-pair';
import { PageLayout } from '@/common/components/page-layout';

const accountSettingsSchema = z.object({
	id: z.string(),
	username: z.string().min(1, 'Username is required.'),
	email: z.string().email('Invalid email address.'),
	firstname: z.string().min(1, 'First name is required.'),
	lastname: z.string().min(1, 'Last name is required.'),
	birthday: z.string().min(8, 'Please enter a valid birthday.').max(20),
});

type InferredAccountSettingsSchema = z.infer<typeof accountSettingsSchema>;

export const Component = () => {
	const [isEditMode, setIsEditMode] = useState(false);
	const methods = useForm<InferredAccountSettingsSchema>({
		resolver: zodResolver(accountSettingsSchema),
		defaultValues: {
			id: client.authStore.model?.id,
			username: client.authStore.model?.username,
			email: client.authStore.model?.email,
			firstname: client.authStore.model?.firstname,
			lastname: client.authStore.model?.lastname,
			birthday: client.authStore.model?.birthday,
		},
	});

	const user = client.authStore.model;

	const toggleEditMode = () => {
		setIsEditMode((prev) => !prev);
	};

	return (
		<PageLayout title="User settings">
			<SpaceBetween size="l">
				<Container
					header={
						<Header
							actions={
								<Button variant="primary" onClick={toggleEditMode}>
									{isEditMode ? 'Save' : 'Edit'}
								</Button>
							}
						>
							Account settings
						</Header>
					}
					footer={
						<SpaceBetween size="s" direction="horizontal">
							<Box variant="small">Account created: {user?.created}</Box>
							<Box variant="small">Last updated: {user?.updated}</Box>
						</SpaceBetween>
					}
				>
					{isEditMode ? (
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit()}>
								<ColumnLayout columns={2} variant="text-grid">
									<SpaceBetween size="l">
										<KeyValuePair label="Account id">
											<FormInput disabled readOnly name="id" />
										</KeyValuePair>
										<KeyValuePair label="Username">
											<FormInput name="username" />
										</KeyValuePair>
										<KeyValuePair label="Email">
											<FormInput name="email" />
										</KeyValuePair>
									</SpaceBetween>
									<SpaceBetween size="l">
										<KeyValuePair label="First name">
											<FormInput name="firstname" />
										</KeyValuePair>
										<KeyValuePair label="Last name">
											<FormInput name="lastname" />
										</KeyValuePair>
										<KeyValuePair label="Birthday">
											<FormDatePicker name="birthday" />
										</KeyValuePair>
									</SpaceBetween>
								</ColumnLayout>
							</form>
						</FormProvider>
					) : (
						<ColumnLayout columns={2} variant="text-grid">
							<SpaceBetween size="l">
								<KeyValuePair label="Account id">{user?.id}</KeyValuePair>
								<KeyValuePair label="Username">
									{user?.username}
								</KeyValuePair>
								<KeyValuePair label="Email">{user?.email}</KeyValuePair>
							</SpaceBetween>
							<SpaceBetween size="l">
								<KeyValuePair label="Full name">
									{user?.firstname} {user?.lastname}
								</KeyValuePair>
								<KeyValuePair label="Birthday">
									{(user?.birthday as string).split(' ')[0]}
								</KeyValuePair>
							</SpaceBetween>
						</ColumnLayout>
					)}
				</Container>
			</SpaceBetween>
		</PageLayout>
	);
};
