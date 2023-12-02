/* eslint-disable react/no-multi-comp */
import { type PropsWithChildren, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import type { ButtonDropdownProps } from '@cloudscape-design/components/button-dropdown';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { selectUser } from '@/features/auth/state/selectors';
import { useAppSelector } from '@/common/hooks';
import { SettingsModal } from '../settings-modal';
import styles from './styles.module.scss';

const HeaderPortal = ({ children }: PropsWithChildren) => {
	const dom = document.querySelector('#h');

	if (!dom) {
		return null;
	}

	return createPortal(children, dom);
};

export const Header = () => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

	const handleItemFollow = useCallback(
		(event: CustomEvent<ButtonDropdownProps.ItemClickDetails>) => {
			const { id, external, href } = event.detail;

			if (id === 'sign-out') {
				console.log('sign out');
			} else if (!external) {
				navigate(href as string);
			}

			event.preventDefault();
			navigate(href as string);
		},
		[navigate],
	);

	return (
		<>
			<HeaderPortal>
				<div className={styles.header}>
					<TopNavigation
						identity={{
							title: 'Ez',
							href: '/',
							onFollow: (event) => {
								event.preventDefault();
								navigate('/');
							},
						}}
						utilities={[
							{
								type: 'button',
								iconName: 'settings',
								onClick: () => {
									setSettingsOpen(!settingsOpen);
								},
							},
							{
								type: 'menu-dropdown',
								text: `Howdy, ${user?.firstname}!`,
								iconName: 'user-profile-active',
								description: user?.email,
								items: [
									{
										id: 'account',
										text: 'Account',
										href: '/account',
									},
									{
										id: 'preferences',
										text: 'Preferences',
										href: '/',
									},
									{
										id: 'security',
										text: 'Security',
										href: '/',
									},
									{
										id: 'support-resources',
										text: 'Support',
										items: [
											{
												id: 'help',
												external: true,
												externalIconAriaLabel:
													'Opens in a new tab',
												text: 'Help',
												href: '/',
											},
											{
												id: 'contact',
												text: 'Contact',
												href: '/',
											},
										],
									},
									{
										id: 'sign-out',
										text: 'Sign out',
									},
								],
								onItemFollow: handleItemFollow,
							},
						]}
					/>
				</div>
			</HeaderPortal>
			<SettingsModal
				visible={settingsOpen}
				onDismiss={() => {
					setSettingsOpen(false);
				}}
			/>
		</>
	);
};
