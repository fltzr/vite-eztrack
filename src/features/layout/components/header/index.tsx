/* eslint-disable react/no-multi-comp */
import { type PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import TopNavigation, {
	type TopNavigationProps,
} from '@cloudscape-design/components/top-navigation';
import { selectUser } from '@/features/auth/state/selectors';
import { signout } from '@/features/auth/state/slice';
import { useAppDispatch, useAppSelector } from '@/common/hooks';
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
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const user = useAppSelector(selectUser);

	const handleMenuDropdownClick: TopNavigationProps.MenuDropdownUtility['onItemClick'] =
		(event) => {
			const { id } = event.detail;

			switch (id) {
				case 'account': {
					event.preventDefault();
					navigate('/account', { replace: true });
					break;
				}
				case 'preferences': {
					event.preventDefault();
					navigate('/preferences', { replace: true });
					break;
				}
				case 'sign-out': {
					event.preventDefault();
					dispatch(signout());
					navigate('/auth/signin', {
						replace: true,
						state: { from: location.pathname, userSignout: true },
					});
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
								onItemClick: handleMenuDropdownClick,
							},
						]}
						search={
							<Box textAlign="left">
								<Button variant="link">Hmm</Button>
							</Box>
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
