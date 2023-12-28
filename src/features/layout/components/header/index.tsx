/* eslint-disable react/no-multi-comp */
import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNavigation, {
	type TopNavigationProps,
} from '@cloudscape-design/components/top-navigation';
import axios from 'axios';
import { SettingsModal } from '../settings-modal';
import { addNotification } from '../../state/slice';
import styles from './styles.module.scss';
import { ServicesDowndown } from '@/features/layout/components/services-dropdown';
import { useAppDispatch } from '@/common/hooks';
import { useSignoutMutation } from '@/features/auth/state/api';

const HeaderPortal = ({ children }: PropsWithChildren) => {
	const dom = document.querySelector('#h');

	if (!dom) {
		return null;
	}

	return createPortal(children, dom);
};

export const Header = () => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [signout] = useSignoutMutation();

	const handleMenuDropdownClick: TopNavigationProps.MenuDropdownUtility['onItemClick'] =
		async (event) => {
			const { id } = event.detail;

			switch (id) {
				case 'account': {
					break;
				}
				case 'preferences': {
					break;
				}
				case 'sign-out': {
					event.preventDefault();
					try {
						await signout({}).unwrap();
					} catch (error) {
						dispatch(
							addNotification({
								autoDismiss: true,
								id: `notification-${Date.now()}`,
								type: 'error',
								header: 'Operation failed.',
								content: "That's all we know",
							}),
						);
					} finally {
						navigate('/auth/signin', { replace: true, state: { from: '/' } });
					}

					break;
				}
				default: {
					break;
				}
			}
		};

	return (
		<>
			<HeaderPortal>
				<div className={styles.header}>
					<TopNavigation
						search={<ServicesDowndown />}
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
								text: `Howdy, user!`,
								iconName: 'user-profile-active',
								description: 'user',
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
								onItemClick: handleMenuDropdownClick,
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
