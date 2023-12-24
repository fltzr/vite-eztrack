import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import ColumnLayout from '@cloudscape-design/components/column-layout';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { FormDatePicker } from '@/common/components/form/date-picker';
import { FormInput } from '@/common/components/form/input';
import { KeyValuePair } from '@/common/components/key-value-pair';
import { PageLayout } from '@/common/layouts/page-layout';
import { UserSettings } from '../../components/user-settings';
import { selectUser } from '../../state/selectors';
import { useAppSelector } from '@/common/hooks/use-app-selector';

const accountSettingsSchema = z.object({
	id: z.string(),
	username: z.string().min(1, 'Username is required.'),
	email: z.string().email('Invalid email address.'),
	firstname: z.string().min(1, 'First name is required.'),
	lastname: z.string().min(1, 'Last name is required.'),
	birthdate: z.string().min(8, 'Please enter a valid birthdate.').max(20),
});

type InferredAccountSettingsSchema = z.infer<typeof accountSettingsSchema>;

export const Component = () => {
	const user = useAppSelector(selectUser);

	const [isEditMode, setIsEditMode] = useState(false);
	const methods = useForm<InferredAccountSettingsSchema>({
		resolver: zodResolver(accountSettingsSchema),
		defaultValues: {
			username: user?.username,
			email: user?.email,
			firstname: user?.firstname,
			lastname: user?.lastname,
			birthdate: user?.birthdate,
		},
	});

	const toggleEditMode = () => {
		setIsEditMode((prev) => !prev);
	};

	return (
		<PageLayout
			disableOverlap
			title="User settings"
			description="Review and manage your settings."
		>
			<Box margin={{ top: 'xxl' }}>
				<SpaceBetween size="l">
					<Container
						variant="default"
						header={
							<Header
								info={<Link variant="info">Info</Link>}
								actions={
									<SpaceBetween size="m" direction="horizontal">
										{isEditMode && (
											<Button
												variant="link"
												onClick={() => {
													setIsEditMode(false);
												}}
											>
												Cancel
											</Button>
										)}
										<Button
											variant="primary"
											onClick={toggleEditMode}
										>
											{isEditMode ? 'Save' : 'Edit'}
										</Button>
									</SpaceBetween>
								}
							>
								Account settings
							</Header>
						}
						footer={
							<SpaceBetween size="s" direction="horizontal">
								<Box variant="small">Created: </Box>
								<Box variant="small">Last updated: </Box>
							</SpaceBetween>
						}
					>
						{isEditMode ? (
							<FormProvider {...methods}>
								<form
									id="update-profile-form"
									// onSubmit={methods.handleSubmit()}
								>
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
											<KeyValuePair label="birthdate">
												<FormDatePicker name="birthdate" />
											</KeyValuePair>
										</SpaceBetween>
									</ColumnLayout>
								</form>
							</FormProvider>
						) : (
							<UserSettings />
						)}
					</Container>
				</SpaceBetween>
			</Box>
		</PageLayout>
	);
};
