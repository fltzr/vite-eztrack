/* eslint-disable react/no-multi-comp */
import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation, {
	type TopNavigationProps,
} from '@cloudscape-design/components/top-navigation';
import { useSignoutMutation } from '@/features/auth/state/api';
import { selectUser } from '@/features/auth/state/selectors';
import { ServicesDowndown } from '@/features/layout/components/services-dropdown';
import { SettingsModal } from '@/features/layout/components/settings-modal';
import { addNotification } from '@/features/layout/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);

	const [signout] = useSignoutMutation();

	const handleMenuDropdownClick: TopNavigationProps.MenuDropdownUtility['onItemClick'] =
		(event) => {
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
						void signout({}).unwrap();
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
						navigate('/auth/signin', {
							replace: true,
							state: { signout: true },
						});
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
						search={user ? <ServicesDowndown /> : undefined}
						identity={{
							title: 'Ez',
							href: '/',
							onFollow: (event) => {
								event.preventDefault();
								navigate('/');
							},
						}}
						utilities={
							user
								? [
										{
											type: 'button',
											iconName: 'settings',
											onClick: () => {
												setSettingsOpen(!settingsOpen);
											},
										},
										{
											type: 'menu-dropdown',
											text: user.firstname
												? `Howdy, ${user.firstname}!`
												: `Howdy, ${user.username ?? 'friend'}!`,
											iconName: 'user-profile-active',
											description: `Signed in as ${user.email}`,
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
									]
								: undefined
						}
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
